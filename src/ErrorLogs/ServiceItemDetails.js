import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import baseURL from "../ApiUrl/Apiurl";
import { useNavigate } from "react-router-dom";

const ServiceItemDetails = () => {
  const { id } = useParams();

  const [serviceItem, setServiceItem] = useState({});
  const [loading, setLoading] = useState(true);

  // inside component

const navigate = useNavigate();

  const userId = localStorage.getItem("userId");
  const companyId = localStorage.getItem("companyId");

  useEffect(() => {
    fetchServiceItemDetails();
  }, [id]);

  const fetchServiceItemDetails = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        `${baseURL}/service-items/${id}/?user_id=${userId}&company_id=${companyId}`
      );

      const data = await response.json();

      if (data.status === "success") {
        setServiceItem(data.data || {});
      }
    } catch (error) {
      console.error("Error fetching service item details:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid user-management-container">

<div className="d-flex justify-content-between align-items-center mb-4">
  <div>
    <h2 className="user-management-title mb-0">
      Service Item Details
    </h2>
    <p className="user-management-subtitle mb-0 text-muted">
      View complete service item information
    </p>
  </div>

  <button
    className="btn btn-outline-primary"
    onClick={() => navigate(-1)}
  >
    ← Back
  </button>
</div>
      {loading ? (
        <div className="text-center my-4">
          <div className="spinner-border text-primary"></div>
          <p>Loading Service Item Details...</p>
        </div>
      ) : (
        <div className="card p-4 shadow-sm">
          <div className="row">

            <div className="col-md-6 mb-3">
              <strong>Service Item ID:</strong> {serviceItem.service_item_id || "-"}
            </div>

            <div className="col-md-6 mb-3">
              <strong>Service Item Name:</strong> {serviceItem.service_item_name || "-"}
            </div>

            <div className="col-md-6 mb-3">
              <strong>Serial Number:</strong> {serviceItem.serial_number || "-"}
            </div>

            <div className="col-md-6 mb-3">
              <strong>PCB Serial Number:</strong> {serviceItem.pcb_serial_number || "-"}
            </div>

            <div className="col-md-6 mb-3">
              <strong>Location:</strong> {serviceItem.location || "-"}
            </div>

            <div className="col-md-6 mb-3">
              <strong>Status:</strong> {serviceItem.status || "-"}
            </div>

            <div className="col-md-6 mb-3">
              <strong>IoT Status:</strong> {serviceItem.iot_status || "-"}
            </div>

            <div className="col-md-6 mb-3">
              <strong>Installation Date:</strong> {serviceItem.installation_date || "-"}
            </div>

            <div className="col-md-6 mb-3">
              <strong>Warranty Start Date:</strong> {serviceItem.warranty_start_date || "-"}
            </div>

            <div className="col-md-6 mb-3">
              <strong>Warranty End Date:</strong> {serviceItem.warranty_end_date || "-"}
            </div>

            <div className="col-md-6 mb-3">
              <strong>Contract End Date:</strong> {serviceItem.contract_end_date || "-"}
            </div>

            <div className="col-md-6 mb-3">
              <strong>Last Checked:</strong> {serviceItem.last_checked || "-"}
            </div>

            <div className="col-md-6 mb-3">
              <strong>Last Service:</strong> {serviceItem.last_service || "-"}
            </div>

            <div className="col-md-6 mb-3">
              <strong>Product Description:</strong> {serviceItem.product_description || "-"}
            </div>

            <div className="col-md-6 mb-3">
              <strong>BC Number:</strong> {serviceItem.bc_number || "-"}
            </div>

            <div className="col-md-6 mb-3">
              <strong>Ship To Code:</strong> {serviceItem.ship_to_code || "-"}
            </div>

            <div className="col-md-6 mb-3">
              <strong>Created By:</strong> {serviceItem.created_by || "-"}
            </div>

            <div className="col-md-6 mb-3">
              <strong>Updated By:</strong> {serviceItem.updated_by || "-"}
            </div>

            <div className="col-md-6 mb-3">
              <strong>Created At:</strong> {serviceItem.created_at || "-"}
            </div>

            <div className="col-md-6 mb-3">
              <strong>Updated At:</strong> {serviceItem.updated_at || "-"}
            </div>

            <div className="col-md-6 mb-3">
              <strong>Company:</strong> {serviceItem.company || "-"}
            </div>

            <div className="col-md-6 mb-3">
              <strong>Product:</strong> {serviceItem.product || "-"}
            </div>

            <div className="col-md-6 mb-3">
              <strong>Customer:</strong> {serviceItem.customer || "-"}
            </div>

            <div className="col-md-6 mb-3">
              <strong>PM Group:</strong> {serviceItem.pm_group || "-"}
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceItemDetails;