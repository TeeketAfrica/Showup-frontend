import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { getPassangerManifest } from "@/store/actions/tripActions";

interface Passenger {
  user_id: string;
  first_name: string;
  last_name: string;
  total_seats_booked: number;
}

const ITEMS_PER_PAGE = 20;

const PassangerManifest = () => {
  const dispatch = useAppDispatch();
  const { tripid } = useParams<{ tripid: string }>();

  // LocalStorage Safe Init
  const [seatMap, setSeatMap] = useState<Record<string, number>>(() => {
    if (!tripid) return {};
    const saved = localStorage.getItem(`manifest-${tripid}`);
    return saved ? JSON.parse(saved) : {};
  });

  const [passengers, setPassengers] = useState<Passenger[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Persist seatMap to localStorage
  useEffect(() => {
    if (!tripid) return;
    localStorage.setItem(`manifest-${tripid}`, JSON.stringify(seatMap));
  }, [seatMap, tripid]);

  // Fetch manifest
  useEffect(() => {
    if (!tripid) return;

    const fetchPassengers = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await dispatch(
          getPassangerManifest({
            trip_id: tripid,
            page_index: currentPage,
            page_size: ITEMS_PER_PAGE,
            ordering: "",
          })
        ).unwrap();

        const apiPassengers: Passenger[] = response.data || response;
        setPassengers(apiPassengers);
        setTotalCount(response.total || apiPassengers.length);

        // Merge new passengers safely
        setSeatMap((prev) => {
          const updated = { ...prev };
          apiPassengers.forEach((p) => {
            if (!(p.user_id in updated)) updated[p.user_id] = 0;
          });
          return updated;
        });
      } catch (err: any) {
        setError(err.message || "Failed to fetch manifest");
      } finally {
        setLoading(false);
      }
    };

    fetchPassengers();
  }, [tripid, currentPage, dispatch]);

  // Seat increment / decrement
  const incrementSeat = (userId: string, totalSeats: number) => {
    setSeatMap((prev) => ({
      ...prev,
      [userId]: Math.min((prev[userId] || 0) + 1, totalSeats),
    }));
  };
  const decrementSeat = (userId: string) => {
    setSeatMap((prev) => ({
      ...prev,
      [userId]: Math.max((prev[userId] || 0) - 1, 0),
    }));
  };
  const markAllArrived = (userId: string, totalSeats: number) => {
    setSeatMap((prev) => ({
      ...prev,
      [userId]: totalSeats,
    }));
  };

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);
  const checkedCount = Object.values(seatMap).filter(
    (v, i) =>
      passengers[i]?.total_seats_booked &&
      v === passengers[i].total_seats_booked
  ).length;

  return (
    <div className="p-4 md:p-6 max-w-6xl mx-auto">
      <h1 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6">
        Passenger Manifest
      </h1>

      {loading && (
        <div className="py-6 text-center text-muted-foreground">
          Loading passengers...
        </div>
      )}
      {error && (
        <div className="py-6 text-center text-red-500">{error}</div>
      )}

      {!loading && !error && (
        <>
          {/* Summary */}
          <div className="mb-4 md:mb-6 flex flex-col md:flex-row justify-between gap-2 bg-muted/30 p-3 md:p-4 rounded-lg">
            <div className="text-sm">
              Total Passengers:{" "}
              <span className="font-medium">{totalCount}</span>
            </div>
            <div className="text-sm">
              Checked In:{" "}
              <span className="font-semibold text-green-600">
                {checkedCount}
              </span>
            </div>
          </div>

          {/* Table */}
          <div className="rounded-xl border overflow-hidden shadow-sm">
            <table className="min-w-full text-sm md:text-base">
              <thead className="bg-muted/50 table-header-group">
                <tr>
                  {/* <th className="px-3 py-2 border-b text-left">#</th> */}
                  <th className="px-3 py-2 border-b text-left">
                    Full Name
                  </th>
                  <th className="px-3 py-2 border-b text-left">
                    Seats
                  </th>
                  <th className="px-3 py-2 border-b text-left">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody className="md:table-row-group">
                {passengers.map((passenger) => {
                  const occupied = seatMap[passenger.user_id] || 0;
                  const isComplete =
                    occupied === passenger.total_seats_booked &&
                    passenger.total_seats_booked > 0;

                  return (
                    <tr
                      key={passenger.user_id}
                      className={`transition-colors md:hover:bg-muted/40 ${
                        isComplete ? "bg-green-50" : ""
                      } flex table-row mb-4 md:mb-0 rounded-lg md:rounded-none border md:border-none`}
                    >
                      {/* Desktop Columns */}
                      <td className="px-3 py-2 text-sm border-b font-medium table-cell">
                        {passenger.first_name} {passenger.last_name}
                      </td>
                      <td className="px-3 py-2 border-b table-cell">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-sm">
                            {occupied}/{passenger.total_seats_booked}
                          </span>
                          <button
                            onClick={() =>
                              decrementSeat(passenger.user_id)
                            }
                            className="px-2 py-1 border rounded disabled:opacity-50"
                            disabled={occupied === 0}
                          >
                            -
                          </button>
                          <button
                            onClick={() =>
                              incrementSeat(
                                passenger.user_id,
                                passenger.total_seats_booked
                              )
                            }
                            className="px-2 py-1 border rounded disabled:opacity-50"
                            disabled={isComplete}
                          >
                            +
                          </button>
                          {!isComplete && (
                            <button
                              onClick={() =>
                                markAllArrived(
                                  passenger.user_id,
                                  passenger.total_seats_booked
                                )
                              }
                              className="text-xs hidden md:block text-green-600 underline"
                            >
                              Mark All Arrived
                            </button>
                          )}
                        </div>
                      </td>
                      <td className="px-3 py-2 border-b table-cell">
                        {isComplete ? (
                          <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-700 font-medium">
                            Arrived
                          </span>
                        ) : (
                          <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-700 font-medium">
                            Pending
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}

                {passengers.length === 0 && (
                  <tr className="flex flex-col">
                    <td
                      colSpan={4}
                      className="text-center py-6 text-muted-foreground"
                    >
                      No passengers found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex flex-col md:flex-row justify-center items-center gap-2 md:gap-4 mt-4 md:mt-6">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
                className="px-3 py-2 border rounded-md disabled:opacity-50 hover:bg-muted"
              >
                Previous
              </button>
              <span className="text-sm text-muted-foreground">
                Page {currentPage} of {totalPages}
              </span>
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => prev + 1)}
                className="px-3 py-2 border rounded-md disabled:opacity-50 hover:bg-muted"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PassangerManifest;
