import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAddAddress } from "@/features/AddressSlice";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import ServerError from "./ServerError";

function AddressPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.userInfo);
  const addAddressStatus = useSelector(
    (state) => state.address.addAddressStatus
  );

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
  }, [dispatch, userInfo]);

  useEffect(() => {
    if (addAddressStatus === "succeeded") {
      toast.success("Address added successfully");
      navigate("/checkout");
    } else if (addAddressStatus === "failed") {
      toast.error("Failed to add address");
    }
  }, [addAddressStatus, navigate]);

  const [houseNo, setHouseNo] = useState("");
  const [landmark, setLandmark] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [pincode, setPincode] = useState("");

  const addAddressHandler = () => {
    dispatch(
      fetchAddAddress({
        house_no: houseNo,
        landmark: landmark,
        city: city,
        state: state,
        country: country,
        pincode: pincode,
      })
    );
  };
  return (
    <div className="min-h-[80vh]">
      {addAddressStatus === "loading" ? (
        <Loader />
      ) : addAddressStatus === "succeeded" || addAddressStatus === "idle" ? (
        <div className="w-[95%] md:w-[70%] lg:w-[50%] mx-auto border-2 mt-8 rounded-lg">
          <h1 className="text-2xl font-bold text-center my-4">Address</h1>
          <div className="m-4">
            <div className="grid gap-2">
              <Label className="md:text-base" htmlFor="house-no">
                House Number
              </Label>
              <Input
                className="md:text-base"
                id="house-no"
                type="address"
                placeholder="House Number"
                required
                onChange={(e) => setHouseNo(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label className="md:text-base" htmlFor="landmark">
                Land Mark
              </Label>
              <Input
                className="md:text-base"
                id="landmark"
                type="address"
                placeholder="Land Mark"
                required
                onChange={(e) => setLandmark(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label className="md:text-base" htmlFor="pin-code">
                Pin Code
              </Label>
              <Input
                className="md:text-base [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                id="pin-code"
                type="number"
                placeholder="Pin Code"
                required
                onChange={(e) => setPincode(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label className="md:text-base" htmlFor="city">
                City
              </Label>
              <Input
                className="md:text-base"
                id="city"
                type="address"
                placeholder="City"
                required
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label className="md:text-base" htmlFor="state">
                State
              </Label>
              <Input
                className="md:text-base"
                id="state"
                type="address"
                placeholder="State"
                required
                onChange={(e) => setState(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label className="md:text-base" htmlFor="country">
                Country
              </Label>
              <Input
                className="md:text-base"
                id="country"
                type="address"
                placeholder="Country"
                required
                onChange={(e) => setCountry(e.target.value)}
              />
            </div>
            <Button
              className="w-full mt-4"
              onClick={addAddressHandler}
              variant="default"
            >
              Add Address
            </Button>
          </div>
        </div>
      ) : addAddressStatus === "failed" ? (
        <ServerError />
      ) : null}
    </div>
  );
}

export default AddressPage;
