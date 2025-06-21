// import React, { useState, useContext} from "react";
// import axios from "axios";
// import "./CompanyInformation.css";
// import { AuthContext } from "../AuthContext/AuthContext";
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// const CompanyForm = ({ onCancel, onSave }) => {
//   const [formData, setFormData] = useState({
//     companyId: "",
//     companyName: "",
//     crNumber: "",
//     vatNumber: "",
//     serviceEmail: "",
//     gmEmail: "",
//     currencyCode: "",
//     timeZone: "",
//     status: "",
//   });
//     const [isSubmitting, setIsSubmitting] = useState(false);

//  const { userId, userRole } = useContext(AuthContext);
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//  const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     const currentTime = new Date().toISOString();

//     const payload = {
//       company_id: formData.companyId,
//       company_name: formData.companyName,
//       cr_number: formData.crNumber,
//       vat_number: formData.vatNumber,
//       service_email: formData.serviceEmail,
//       gm_email: formData.gmEmail,
//       currency_code: formData.currencyCode,
//       time_zone: formData.timeZone,
//       status: formData.status,
//       created_at: currentTime,
//       updated_at: currentTime,
//       created_by: userId,
//       updated_by: userId,
//     };

//     try {
//       const response = await axios.post("http://175.29.21.7:8006/companies/", payload);
      
//       toast.success('Company added successfully!', {
//         autoClose: 3000,
//         onClose: onSave
//       });
      
//       // Reset form after successful submission
//       setFormData({
//         companyId: "",
//         companyName: "",
//         crNumber: "",
//         vatNumber: "",
//         serviceEmail: "",
//         gmEmail: "",
//         currencyCode: "",
//         timeZone: "",
//         status: "",
//       });
      
//     } catch (error) {
//       console.error("Error adding company:", error);
      
//       let errorMessage = "Failed to add company";
//       if (error.response) {
//         errorMessage = error.response.data.message || errorMessage;
//       }
      
//       toast.error(errorMessage, {
//         autoClose: 5000,
//       });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     // <div className="container my-4">
//     //   <div className="company-form-box p-4">
//     //     <h2 className="company-form-heading">Company Information</h2>
//     //     <p className="company-form-subtitle">Fill in the company details below</p>

//     //     <form onSubmit={handleSubmit}>
//     //       <div className="row g-3 mb-3">
//     //         <div className="col-md-6">
//     //           <label className="form-label">Company ID</label>
//     //           <input
//     //             type="text"
//     //             name="companyId"
//     //             className="form-control"
//     //             value={formData.companyId}
//     //             onChange={handleChange}
//     //             required
//     //           />
//     //         </div>
//     //         <div className="col-md-6">
//     //           <label className="form-label">Company Name</label>
//     //           <input
//     //             type="text"
//     //             name="companyName"
//     //             className="form-control"
//     //             value={formData.companyName}
//     //             onChange={handleChange}
//     //             required
//     //           />
//     //         </div>
//     //         <div className="col-md-6">
//     //           <label className="form-label">C.R Number</label>
//     //           <input
//     //             type="text"
//     //             name="crNumber"
//     //             className="form-control"
//     //             value={formData.crNumber}
//     //             onChange={handleChange}
//     //             required
//     //           />
//     //         </div>
//     //         <div className="col-md-6">
//     //           <label className="form-label">VAT Number</label>
//     //           <input
//     //             type="text"
//     //             name="vatNumber"
//     //             className="form-control"
//     //             value={formData.vatNumber}
//     //             onChange={handleChange}
//     //           />
//     //         </div>
//     //         <div className="col-md-6">
//     //           <label className="form-label">Service Email</label>
//     //           <input
//     //             type="email"
//     //             name="serviceEmail"
//     //             className="form-control"
//     //             value={formData.serviceEmail}
//     //             onChange={handleChange}
//     //           />
//     //         </div>
//     //         <div className="col-md-6">
//     //           <label className="form-label">GM Email</label>
//     //           <input
//     //             type="email"
//     //             name="gmEmail"
//     //             className="form-control"
//     //             value={formData.gmEmail}
//     //             onChange={handleChange}
//     //           />
//     //         </div>
//     //         <div className="col-md-6">
//     //           <label className="form-label">Currency Code</label>
//     //           <input
//     //             type="text"
//     //             name="currencyCode"
//     //             className="form-control"
//     //             value={formData.currencyCode}
//     //             onChange={handleChange}
//     //           />
//     //         </div>
//     //         <div className="col-md-6">
//     //           <label className="form-label">Time Zone</label>
//     //           <input
//     //             type="text"
//     //             name="timeZone"
//     //             className="form-control"
//     //             value={formData.timeZone}
//     //             onChange={handleChange}
//     //           />
//     //         </div>
//     //         <div className="col-md-6">
//     //           <label className="form-label">Status</label>
//     //           <select
//     //             name="status"
//     //             className="form-select"
//     //             value={formData.status}
//     //             onChange={handleChange}
//     //             required
//     //           >
//     //             <option value="">Select Status</option>
//     //             <option value="Active">Active</option>
//     //             <option value="Inactive">Inactive</option>
//     //           </select>
//     //         </div>
//     //       </div>

//     //       <div className="d-flex justify-content-end gap-2 flex-wrap">
//     //         <button type="button" className="btn btn-outline-secondary" onClick={onCancel}>
//     //           Cancel
//     //         </button>
//     //         <button type="submit" className="btn btn-primary">
//     //           Save Company
//     //         </button>
//     //       </div>
//     //     </form>
//     //   </div>
//     // </div>

//     <div className="container mt-4 service-request-form">
//        <ToastContainer
//         position="top-right"
//         autoClose={5000}
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//       />
//   <div className="card">
//     <div className="card-header">
//       <h5 className="mb-1">Company Information</h5>
//       <h6 className="text" style={{ color: "white" }}>
//         Fill in the company details below
//       </h6>
//       <h6 className="text" style={{ color: "white" }}>
//   Logged in as: <strong>{userId},{userRole}</strong>
// </h6>
//     </div>
//     <div className="card-body">
//       <form onSubmit={handleSubmit}>
//         <div className="row g-3">
//           <div className="col-md-4">
//             <label className="form-label">Company ID</label>
//             <input
//               type="text"
//               name="companyId"
//               className="form-control"
//               value={formData.companyId}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div className="col-md-4">
//             <label className="form-label">Company Name</label>
//             <input
//               type="text"
//               name="companyName"
//               className="form-control"
//               value={formData.companyName}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div className="col-md-4">
//             <label className="form-label">C.R Number</label>
//             <input
//               type="text"
//               name="crNumber"
//               className="form-control"
//               value={formData.crNumber}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div className="col-md-4">
//             <label className="form-label">VAT Number</label>
//             <input
//               type="text"
//               name="vatNumber"
//               className="form-control"
//               value={formData.vatNumber}
//               onChange={handleChange}
//             />
//           </div>
//           <div className="col-md-4">
//             <label className="form-label">Service Email</label>
//             <input
//               type="email"
//               name="serviceEmail"
//               className="form-control"
//               value={formData.serviceEmail}
//               onChange={handleChange}
//             />
//           </div>
//           <div className="col-md-4">
//             <label className="form-label">GM Email</label>
//             <input
//               type="email"
//               name="gmEmail"
//               className="form-control"
//               value={formData.gmEmail}
//               onChange={handleChange}
//             />
//           </div>
//           <div className="col-md-4">
//             <label className="form-label">Currency Code</label>
//             <input
//               type="text"
//               name="currencyCode"
//               className="form-control"
//               value={formData.currencyCode}
//               onChange={handleChange}
//             />
//           </div>
//           <div className="col-md-4">
//             <label className="form-label">Time Zone</label>
//             <input
//               type="text"
//               name="timeZone"
//               className="form-control"
//               value={formData.timeZone}
//               onChange={handleChange}
//             />
//           </div>
//           <div className="col-md-4">
//             <label className="form-label">Status</label>
//             <select
//               name="status"
//               className="form-control"
//               value={formData.status}
//               onChange={handleChange}
//               required
//             >
//               <option value="">Select Status</option>
//               <option value="Active">Active</option>
//               <option value="Inactive">Inactive</option>
//             </select>
//           </div>

//        <div className="d-flex justify-content-center mt-3 gap-3">
//                 <button 
//                   type="submit" 
//                   className="submit-btn"
//                   disabled={isSubmitting}
//                 >
//                   {isSubmitting ? 'Saving Company...' : 'Save Company'}
//                 </button>
//                 <button 
//                   type="button" 
//                   className="btn btn-secondary" 
//                   onClick={onCancel}
//                   disabled={isSubmitting}
//                 >
//                   Cancel
//                 </button>
//               </div>
//         </div>
//       </form>
//     </div>
//   </div>
// </div>
//   );
// };

// export default CompanyForm;







import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import "./CompanyInformation.css";
import { AuthContext } from "../AuthContext/AuthContext";
import Swal from "sweetalert2";

const CompanyForm = ({ onCancel, onSave, initialData = null }) => {
  const [formData, setFormData] = useState({
    companyId: "",
    companyName: "",
    crNumber: "",
    vatNumber: "",
    serviceEmail: "",
    gmEmail: "",
    currencyCode: "",
    timeZone: "",
    status: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const { userId, userRole } = useContext(AuthContext);

  useEffect(() => {
    if (initialData) {
      setFormData({
        companyId: initialData.company_id,
        companyName: initialData.company_name,
        crNumber: initialData.cr_number,
        vatNumber: initialData.vat_number,
        serviceEmail: initialData.service_email,
        gmEmail: initialData.gm_email,
        currencyCode: initialData.currency_code,
        timeZone: initialData.time_zone,
        status: initialData.status,
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const currentTime = new Date().toISOString();

    const payload = {
      company_id: formData.companyId,
      company_name: formData.companyName,
      cr_number: formData.crNumber,
      vat_number: formData.vatNumber,
      service_email: formData.serviceEmail,
      gm_email: formData.gmEmail,
      currency_code: formData.currencyCode,
      time_zone: formData.timeZone,
      status: formData.status,
      updated_at: currentTime,
      updated_by: userId,
    };

    if (!initialData) {
      payload.created_at = currentTime;
      payload.created_by = userId;
    }

    try {
      if (initialData) {
        // Update existing company
        await axios.put(`http://175.29.21.7:8006/companies/${formData.companyId}/`, payload);
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Company updated successfully!",
          confirmButtonColor: "#3085d6",
        }).then(onSave);
      } else {
        // Create new company
        await axios.post("http://175.29.21.7:8006/companies/", payload);
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Company added successfully!",
          confirmButtonColor: "#3085d6",
        }).then(onSave);
      }

      setFormData({
        companyId: "",
        companyName: "",
        crNumber: "",
        vatNumber: "",
        serviceEmail: "",
        gmEmail: "",
        currencyCode: "",
        timeZone: "",
        status: "",
      });
    } catch (error) {
      console.error("Error submitting company:", error);
      let errorMessage = "Failed to submit company";
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }

      Swal.fire({
        icon: "error",
        title: "Error",
        text: errorMessage,
        confirmButtonColor: "#d33",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mt-4 service-request-form">
      <div className="card">
        <div className="card-header">
          <h5 className="mb-1">{initialData ? "Edit Company" : "Company Information"}</h5>
          <h6 className="text" style={{ color: "white" }}>
            {initialData ? "Update the company details below" : "Fill in the company details below"}
          </h6>
          <h6 className="text" style={{ color: "white" }}>
            Logged in as: <strong>{userId}, {userRole}</strong>
          </h6>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-4">
                <label className="form-label">Company ID</label>
                <input
                  type="text"
                  name="companyId"
                  className="form-control"
                  value={formData.companyId}
                  onChange={handleChange}
                  required
                  disabled={!!initialData}
                />
              </div>
              <div className="col-md-4">
                <label className="form-label">Company Name</label>
                <input
                  type="text"
                  name="companyName"
                  className="form-control"
                  value={formData.companyName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-4">
                <label className="form-label">C.R Number</label>
                <input
                  type="text"
                  name="crNumber"
                  className="form-control"
                  value={formData.crNumber}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-4">
                <label className="form-label">VAT Number</label>
                <input
                  type="text"
                  name="vatNumber"
                  className="form-control"
                  value={formData.vatNumber}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-4">
                <label className="form-label">Service Email</label>
                <input
                  type="email"
                  name="serviceEmail"
                  className="form-control"
                  value={formData.serviceEmail}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-4">
                <label className="form-label">GM Email</label>
                <input
                  type="email"
                  name="gmEmail"
                  className="form-control"
                  value={formData.gmEmail}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-4">
                <label className="form-label">Currency Code</label>
                <input
                  type="text"
                  name="currencyCode"
                  className="form-control"
                  value={formData.currencyCode}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-4">
                <label className="form-label">Time Zone</label>
                <input
                  type="text"
                  name="timeZone"
                  className="form-control"
                  value={formData.timeZone}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-4">
                <label className="form-label">Status</label>
                <select
                  name="status"
                  className="form-control"
                  value={formData.status}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Status</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              <div className="d-flex justify-content-center mt-3 gap-3">
                <button
                  type="submit"
                  className="submit-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting
                    ? initialData
                      ? "Updating..."
                      : "Saving..."
                    : initialData
                    ? "Update Company"
                    : "Save Company"}
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={onCancel}
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CompanyForm;

