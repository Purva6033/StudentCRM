import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import LeadForm from "../components/LeadForm";
import {
    getAllLeads,
    addLead,
    updateLead,
    deleteLead,
    searchLeads,
    importExcel
} from "../services/leadService";

import { toast } from "react-toastify";

function Leads() {

    const [leads, setLeads] = useState([]);
    const [selectedLead, setSelectedLead] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [keyword, setKeyword] = useState("");
    const [excelFile, setExcelFile] = useState(null);

    useEffect(() => {
        loadLeads();
    }, []);

    const loadLeads = async () => {
        try {
            const response = await getAllLeads();
            setLeads(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSave = async (lead) => {
        try {

            if (selectedLead) {

                await updateLead(selectedLead.leadId, lead);
                toast.success("Lead Updated Successfully");

            } else {

                await addLead(lead);
                toast.success("Lead Added Successfully");

            }

            setSelectedLead(null);
            setShowForm(false);
            loadLeads();

        } catch (error) {

            console.error(error);

        }
    };

    const handleEdit = (lead) => {
        setSelectedLead(lead);
        setShowForm(true);
    };

    const handleDelete = async (id) => {

        if (!window.confirm("Are you sure you want to delete this lead?"))
            return;

        try {

            await deleteLead(id);
            toast.success("Lead Deleted Successfully");
            loadLeads();

        } catch (error) {

            console.error(error);

        }

    };

    const handleSearch = async () => {

        if (keyword.trim() === "") {

            loadLeads();
            return;

        }

        try {

            const response = await searchLeads(keyword);
            setLeads(response.data);

        } catch (error) {

            console.error(error);

        }

    };
    const handleImport = async () => {
        setExcelFile(null);

        document.getElementById("excelFile").value = "";
        <input
            id="excelFile"
            type="file"
            accept=".xlsx,.xls"

        />

        if (!excelFile) {

            toast.warning("Please select an Excel file");

            return;

        }

        try {

            const response = await importExcel(excelFile);

            toast.success(

                `Imported : ${response.data.imported}
Duplicate : ${response.data.duplicate}
Failed : ${response.data.failed}`

            );

            setExcelFile(null);

            loadLeads();

        }

        catch (error) {

            console.log(error);

            toast.error("Import Failed");

        }

    };

    const handleCancel = () => {

        setShowForm(false);
        setSelectedLead(null);

    };

    return (
        <MainLayout>
            <div className="container mt-4">

                <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-4">

                    <h2 className="mb-0">
                        Lead Management
                    </h2>

                    <div className="d-flex flex-wrap gap-2">

                        <button
                            className="btn btn-success"
                            onClick={() => {
                                setSelectedLead(null);
                                setShowForm(true);
                            }}
                        >
                            ➕ Add Lead
                        </button>

                        <input
                            type="file"
                            accept=".xlsx,.xls"
                            className="form-control"
                            style={{ width: "220px" }}
                            onChange={(e) => setExcelFile(e.target.files[0])}
                        />

                        <button
                            className="btn btn-primary"
                            onClick={handleImport}
                        >
                            📂 Import Excel
                        </button>

                        <button
                            className="btn btn-secondary"
                            onClick={loadLeads}
                        >
                            🔄 Refresh
                        </button>
                        <a
                            href="/sample_leads.csv"
                            download
                            className="btn btn-warning"
                        >
                            ⬇ Download Sample
                        </a>

                    </div>

                </div>
                {showForm && (
                    <LeadForm
                        onSave={handleSave}
                        selectedLead={selectedLead}
                        onCancel={handleCancel}
                    />
                )}

                <div className="row mb-3">

                    <div className="col-md-8">

                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search Lead..."
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                        />

                    </div>

                    <div className="col-md-4">

                        <button
                            className="btn btn-primary me-2"
                            onClick={handleSearch}
                        >
                            Search
                        </button>

                        <button
                            className="btn btn-secondary"
                            onClick={loadLeads}
                        >
                            Reset
                        </button>

                    </div>

                </div>

                <table className="table table-bordered table-hover">

                    <thead className="table-dark">

                        <tr>

                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Course</th>
                            <th>Source</th>
                            <th>Status</th>
                            <th>Counselor</th>
                            <th>Actions</th>

                        </tr>

                    </thead>

                    <tbody>

                        {leads.length > 0 ? (

                            leads.map((lead) => (

                                <tr key={lead.leadId}>

                                    <td>{lead.leadId}</td>
                                    <td>{lead.studentName}</td>
                                    <td>{lead.email}</td>
                                    <td>{lead.phone}</td>

                                    <td>{lead.courseInterested}</td>

                                    <td>{lead.source}</td>

                                    <td>{lead.status}</td>

                                    <td>{lead.counselor?.fullName}</td>

                                    <td>

                                        <button
                                            className="btn btn-warning btn-sm me-2"
                                            onClick={() => handleEdit(lead)}
                                        >
                                            Edit
                                        </button>

                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => handleDelete(lead.leadId)}
                                        >
                                            Delete
                                        </button>

                                    </td>

                                </tr>

                            ))

                        ) : (

                            <tr>

                                <td colSpan="9" className="text-center">

                                    No Leads Found

                                </td>

                            </tr>

                        )}

                    </tbody>

                </table>

            </div>
        </MainLayout>
    );

}

export default Leads;