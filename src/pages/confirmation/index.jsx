import React from "react";
import { CheckCircle } from "react-feather";
import { useNavigate, useParams } from "react-router-dom";
import SampleImage from "../../assets/booking.png";
import {
  BUTTON_BACK_TO_DASHBOARD,
  FIELD_RESERVATION_DURATION,
  FIELD_RESERVATION_END_TIME,
  FIELD_RESERVATION_RESOURCE_NAME,
  FIELD_RESERVATION_START_TIME,
  FIELD_RESERVATION_TOTAL_COST,
  FIELD_RESOURCE_LOCATION,
  FIELD_RESOURCE_OBJECT,
  FIELD_RESOURCE_RATING,
  FIELD_RESOURCE_STAFF,
  LABEL_CANCELLATION_POLICY,
  LABEL_CLINIC_RATING,
  LABEL_DENTIST_APPOINTMENT_WITH,
  LABEL_TOTAL,
  LABEL_USD,
  MESSAGE_CANCELLATION_POLICY,
  MESSAGE_CONFIRMED,
  MESSAGE_LOADING_BOOKING_APPOINTMENT,
} from "../../sdk/constants";
import { useDentistResources, useReservationResource } from "../../sdk/hooks";
import Skeleton from "../../components/skeleton";

export default function ConfirmationPage() {
  const { id } = useParams();

  const { isLoading: reservationLoading, reservation } =
    useReservationResource(id);
  const { isLoading: dentistsLoading, dentists, rooms } = useDentistResources();

  const navigate = useNavigate();

  const handleBackToDashboard = () => {
    navigate("/");
  };

  if (reservationLoading || !reservation) {
    return (
      <div className="flex flex-col items-center justify-center h-full pt-40">
        <div className="w-24 h-24 border-8 border-black border-dashed rounded-full animate-spin"></div>
        <p className="mt-4 text-xl font-semibold text-black">
          {MESSAGE_LOADING_BOOKING_APPOINTMENT}
        </p>
      </div>
    );
  }

  const roomId = reservation.getCustomProperty(FIELD_RESOURCE_OBJECT);
  const dentistId = rooms?.find((room) => room.id === roomId)?.parentId;
  const dentist = dentists?.find((dentist) => dentist.id === dentistId);
  const dentistAddress = dentist?.getCustomProperty(FIELD_RESOURCE_LOCATION);

  const staff = reservation.getCustomProperty(FIELD_RESOURCE_STAFF);
  const roomName = reservation.getCustomProperty(
    FIELD_RESERVATION_RESOURCE_NAME
  );
  const start = new Date(
    reservation.getCustomProperty(FIELD_RESERVATION_START_TIME)
  );
  const end = new Date(
    reservation.getCustomProperty(FIELD_RESERVATION_END_TIME)
  );
  const cost = reservation.getCustomProperty(FIELD_RESERVATION_TOTAL_COST);
  const duration = reservation.getCustomProperty(FIELD_RESERVATION_DURATION);
  const rating = reservation.getCustomProperty(FIELD_RESOURCE_RATING);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex gap-2 items-center">
        <div className="items-center rounded-full bg-green-500 py-1.5 px-3 font-sans text-xs font-bold uppercase text-white">
          <CheckCircle className="size-3 inline-block me-1" />
          {MESSAGE_CONFIRMED}
        </div>
        <div className="font-bold">
          Appointment Made For: {start.toLocaleString()}
        </div>
      </div>
      <hr className="bg-gray-300 h-0.5" />
      <div className="flex flex-row gap-16">
        <div className="flex flex-col gap-16">
          <div className="relative">
            <div className="bg-black rounded-3xl w-[14rem] h-[22rem] me-8 mb-8" />
            <img
              src={SampleImage}
              alt="Dentist Logo"
              className="absolute top-8 left-8 rounded-3xl w-[14rem] h-[22rem] object-cover"
            />
          </div>
          <div className="w-[16rem]">
            <div className="font-bold">{LABEL_CANCELLATION_POLICY}</div>
            {MESSAGE_CANCELLATION_POLICY}
          </div>
        </div>
        <div className="flex flex-col gap-8 flex-1">
          <div>
            <div className="font-bold text-2xl">{roomName}</div>
            {(dentistsLoading || !dentistAddress) && (
              <Skeleton className="h-8" />
            )}
            {!!dentistAddress && (
              <div className="font-medium">{dentistAddress}</div>
            )}
            <div className="font-medium">
              {LABEL_CLINIC_RATING} {rating}
            </div>
          </div>
          <div className="rounded-lg border border-gray-300 p-5 text-blue-dark max-w-3xl">
            <div className="flex justify-between font-medium text-2xl py-4">
              <div>
                {LABEL_DENTIST_APPOINTMENT_WITH} {staff}
              </div>
              <div className="font-normal">{duration}h</div>
            </div>
            <hr className="border-t border-black opacity-20 my-4 pb-4" />
            <div className="flex justify-between">
              <div className="font-medium">{LABEL_TOTAL}</div>
              <div>
                {LABEL_USD} {cost}
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <button
              onClick={handleBackToDashboard}
              className="bg-blue-dark hover:bg-blue-hover text-white font-bold py-2 px-4 rounded"
            >
              {BUTTON_BACK_TO_DASHBOARD}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
