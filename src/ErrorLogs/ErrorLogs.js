import React, { useEffect, useState } from "react";
import baseURL from "../ApiUrl/Apiurl";
import { useNavigate } from "react-router-dom";

const MachineStatus = () => {
  const [machines, setMachines] = useState([]);
  const [filteredMachines, setFilteredMachines] = useState([]);
  const [serviceItems, setServiceItems] = useState([]);
  const [loading, setLoading] = useState(true); // loader
  const [searchTerm, setSearchTerm] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();

  const userId = localStorage.getItem("userId");
  const companyId = localStorage.getItem("companyId");

  useEffect(() => {
    fetchData();
  }, []);

  // fetch both APIs
  const fetchData = async () => {
    try {
      setLoading(true);

      const [machineRes, serviceRes] = await Promise.all([
        fetch(
          `${baseURL}/get-latest-data/?user_id=${userId}&company_id=${companyId}`
        ),
        fetch(
          `${baseURL}/service-items/?user_id=${userId}&company_id=${companyId}`
        ),
      ]);

      const machineData = await machineRes.json();
      const serviceData = await serviceRes.json();

      if (machineData.status === "success") {
        // only null value items
        const nullOnlyData = (machineData.data || []).filter((machine) =>
          hasNullValues(machine)
        );

        setMachines(nullOnlyData);
        setFilteredMachines(nullOnlyData);
      }

      if (serviceData.status === "success") {
        setServiceItems(serviceData.data || []);
      }
    } catch (err) {
      console.error("Error fetching machine data:", err);
    } finally {
      setLoading(false);
    }
  };

  // check null values
  const hasNullValues = (machine) => {
    return Object.values(machine).some((field) => {
      if (typeof field === "object" && field !== null) {
        return field.value === null;
      }
      return false;
    });
  };

  // get service item details using pcb serial
  const getServiceItemDetails = (pcbSerial) => {
    const matched = serviceItems.find(
      (item) => item.pcb_serial_number === pcbSerial
    );

    return {
      service_item_id: matched?.service_item_id || "-",
      serial_number: matched?.serial_number || "-",
    };
  };

  // search
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredMachines(machines);
      setCurrentPage(1);
      return;
    }

    const searchLower = searchTerm.toLowerCase();

    const filtered = machines.filter((m) => {
      const service = getServiceItemDetails(m.pcb_serial_number);

      return [
        m.pcb_serial_number,
        service.service_item_id,
        service.serial_number,
      ]
        .join(" ")
        .toLowerCase()
        .includes(searchLower);
    });

    setFilteredMachines(filtered);
    setCurrentPage(1);
  }, [searchTerm, machines, serviceItems]);

  // pagination
  const indexOfLast = currentPage * entriesPerPage;
  const indexOfFirst = indexOfLast - entriesPerPage;
  const currentData = filteredMachines.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredMachines.length / entriesPerPage);

  // hyperlink click
  const handleNavigate = (serviceItemId) => {
    navigate(`/superadmin/service-item-details/${serviceItemId}`, {
      state: { service_item_id: serviceItemId },
    });
  };

  return (
    <div className="container-fluid user-management-container">

      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap">
        <div>
          <h2 className="user-management-title mb-0">Machine Status</h2>
          <p className="user-management-subtitle mb-0 text-muted">
            Null Value Service Items
          </p>
        </div>
      </div>

      {/* CONTROLS */}
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
        <div className="d-flex align-items-center gap-2">
          Show
          <select
            value={entriesPerPage}
            onChange={(e) => setEntriesPerPage(Number(e.target.value))}
            className="form-select form-select-sm w-auto"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={25}>25</option>
          </select>
          entries
        </div>

        <input
          type="text"
          placeholder="Search..."
          className="form-control"
          style={{ minWidth: "250px" }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* LOADER */}
      {loading ? (
        <div className="text-center my-3">
          <div className="spinner-border text-primary"></div>
          <p>Loading Machine Status...</p>
        </div>
      ) : (
        <>
          {/* TABLE */}
          <div className="table-responsive mb-4">
            <table className="table">
              <thead className="product-table-header">
                <tr>
                  <th>S.No</th>
                  <th>Service Item ID</th>
                  <th>PCB Serial Number</th>
                  <th>Serial Number</th>
                  <th>Issue</th>
                </tr>
              </thead>

              <tbody>
                {currentData.length > 0 ? (
                  currentData.map((m, idx) => {
                    const service = getServiceItemDetails(
                      m.pcb_serial_number
                    );

                    return (
                      <tr key={idx}>
                        <td>{indexOfFirst + idx + 1}</td>

                        {/* hyperlink */}
                        <td>
                          <span
                            onClick={() =>
                              handleNavigate(service.service_item_id)
                            }
                            style={{
                              color: "#0d6efd",
                              cursor: "pointer",
                              textDecoration: "underline",
                              fontWeight: "500",
                            }}
                          >
                            {service.service_item_id}
                          </span>
                        </td>

                        <td>{m.pcb_serial_number || "-"}</td>
                        <td>{service.serial_number}</td>

                        <td style={{ color: "red", fontWeight: "bold" }}>
                          Server Issue / No Data
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center">
                      No data found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* PAGINATION */}
          {totalPages > 1 && (
            <div className="pagination-controls d-flex justify-content-center mt-3">
              <button
                className="btn btn-outline-primary me-2"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
              >
                Previous
              </button>

              <span className="mx-2 align-self-center">
                Page {currentPage} of {totalPages}
              </span>

              <button
                className="btn btn-outline-primary ms-2"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => prev + 1)}
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

export default MachineStatus;