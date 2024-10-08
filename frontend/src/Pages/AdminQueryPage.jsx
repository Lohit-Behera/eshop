import React from "react";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchContactUsGetById,
  fetchContactUsUpdate,
} from "@/features/ContactUsSlice";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { ArrowLeft, ListChecks } from "lucide-react";

function AdminQueryPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userInfo = useSelector((state) => state.user.userInfo);
  const query = useSelector((state) => state.contactUs.getContactUsById) || {};
  const getContactUsByIdStatus = useSelector(
    (state) => state.contactUs.getContactUsByIdStatus
  );
  const updateContactUsStatus = useSelector(
    (state) => state.contactUs.updateContactUsStatus
  );

  useEffect(() => {
    if (userInfo && userInfo.is_staff) {
      dispatch(fetchContactUsGetById(id));
    } else {
      navigate("/login");
    }
  }, [userInfo, dispatch]);

  useEffect(() => {
    if (updateContactUsStatus === "succeeded") {
      dispatch(fetchContactUsGetById(id));
    }
  }, [updateContactUsStatus]);

  const handelUpdateContactUs = () => {
    const updateContactUsPromise = dispatch(fetchContactUsUpdate(id)).unwrap();
    toast.promise(updateContactUsPromise, {
      loading: "Updating query...",
      success: "Query updated successfully",
      error: "Failed to update query",
    });
  };

  return (
    <div className="w-[95%] min-h-[80vh] mx-auto border-2 rounded-lg p-4 bg-background/70">
      {getContactUsByIdStatus === "succeeded" && (
        <>
          <h1 className="text-2xl font-bold text-center">Query</h1>
          <div className="w-[95%] text-sm md:text-base p-2 rounded-lg my-4 mx-auto space-y-2">
            <p>Name: {query.name}</p>
            <p>Email: {query.email}</p>
            <p>Status: {query.is_resolved ? "Resolved" : "Pending"}</p>
            <p>Date: {query.created_at.substring(0, 10)}</p>
            <p className="min-h-[23rem]">
              Message: <br />
              {query.message}
            </p>
          </div>
          <div className="w-full flex justify-between space-x-4">
            {query.is_resolved ? null : (
              <Button className="w-full" onClick={handelUpdateContactUs}>
                <ListChecks className="mr-2 w-4 h-4" />
                Resolved
              </Button>
            )}
            <Button className="w-full" onClick={() => navigate(-1)}>
              <ArrowLeft className="mr-2 w-4 h-4" />
              Go Back
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

export default AdminQueryPage;
