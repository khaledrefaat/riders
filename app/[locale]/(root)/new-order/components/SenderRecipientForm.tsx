"use client";

import { FirstStepSchemaDictionary } from "@/types/ordersTypes";
import { useLocale, useTranslations } from "next-intl";
import { firstStepSchema } from "./schema";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import FormItem from "@/components/common/FormItem";
import { Form, FormField } from "@/components/ui/form";
import { useEffect, useState } from "react";
import Select from "./Select";
import { Locale } from "@/types";
import { Checkbox } from "./CheckBox";
import CustomButton from "@/components/common/CustomButton";
import { Link, useRouter } from "@/i18n/routing";
import { GovernorateType } from "@/types/locationTypes";
import { useLocationReducer } from "./useLocationReducer";
import {
  UPDATE_AREAS,
  UPDATE_BLOCKS,
  UPDATE_STREETS,
} from "@/constants/location";
import Loading from "@/components/common/Loading";
import toast from "react-hot-toast";
import { getAreas, getBlocks, getStreets } from "@/services/order-services";
import GoogleMap from "./GoogleMap";
import { useDeliveryStore } from "@/store/order-store";

interface Props {
  sender: boolean;
  govs: GovernorateType[];
}

const defaultCords = { lat: "29.362496", lng: "48.004059" };

export default function SenderRecipientForm({ sender, govs }: Props) {
  const { state, dispatch } = useLocationReducer();
  const [loading, setLoading] = useState(false);
  const t = useTranslations("orders");
  const locale = useLocale() as Locale;
  const router = useRouter();
  const setSenderInfo = useDeliveryStore((state) => state.setSenderInfo);
  const setRecipientInfo = useDeliveryStore((state) => state.setRecipientInfo);
  const senderInfo = useDeliveryStore((state) => state.getSenderInfo());
  const recipientInfo = useDeliveryStore((state) => state.getRecipientInfo());
  const [cords, setCords] = useState({ lat: "29.362496", lng: "48.004059" });

  async function selectGov(id: string | number) {
    setLoading(true);
    try {
      const selectedGov = govs.find((gov) => gov.id === id);
      setCords({
        lat: selectedGov?.lat || defaultCords.lat,
        lng: selectedGov?.lng || defaultCords.lng,
      });
      const areas = await getAreas(id, locale);
      dispatch({ type: UPDATE_AREAS, payload: areas.data });
    } catch (error: unknown) {
      toast.error((error as Error).message);
    } finally {
      setLoading(false);
    }
  }

  async function selectArea(id: string | number) {
    setLoading(true);
    try {
      const selectedArea = state.areas.find((area) => area.id === id);
      setCords({
        lat: selectedArea?.lat || defaultCords.lat,
        lng: selectedArea?.lng || defaultCords.lng,
      });
      const blocks = await getBlocks(id, locale);
      dispatch({ type: UPDATE_BLOCKS, payload: blocks.data });
    } catch (error: unknown) {
      toast.error((error as Error).message);
    } finally {
      setLoading(false);
    }
  }

  async function selectBlock(id: string | number) {
    setLoading(true);
    try {
      const selectedBlock = state.blocks.find((block) => block.id === id);
      setCords({
        lat: selectedBlock?.lat || defaultCords.lat,
        lng: selectedBlock?.lng || defaultCords.lng,
      });
      const streets = await getStreets(id, locale);
      dispatch({ type: UPDATE_STREETS, payload: streets.data });
    } catch (error: unknown) {
      toast.error((error as Error).message);
    } finally {
      setLoading(false);
    }
  }

  const errorDictionary: FirstStepSchemaDictionary = {
    defaultError: t("this_field_is_required"),
    phone: t("valid_phone"),
  };

  const schema = firstStepSchema(errorDictionary);

  const registerForm = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });

  async function handelSubmit(data: z.infer<typeof schema>) {
    const pickup_address = {
      coordinates: cords,
      governorate_id: data.governorate_id,
      area_id: data.area_id,
      block_id: data.block_id,
      street_id: data.street_id,
      house: data.house,
      notes: data.notes || "",
      avenue: data.avenue || "",
    };
    try {
      if (!sender) {
        const recipientInfo = {
          recipient_name_first: data.first_name,
          recipient_name_last: data.last_name,
          recipient_phone: data.phone,
          delivery_address: pickup_address,
        };
        setRecipientInfo(recipientInfo);
        router.push("/new-order?step=3");
      } else {
        const senderInfo = {
          first_name: data.first_name,
          last_name: data.last_name,
          phone: data.phone,
          pickup_address,
        };
        setSenderInfo(senderInfo);
        router.push("/new-order?step=2");
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    console.log(senderInfo);
    console.log(sender);
    if (!sender) {
      registerForm.setValue("first_name", recipientInfo.recipient_name_first);
      registerForm.setValue("last_name", recipientInfo.recipient_name_last);
      registerForm.setValue("phone", recipientInfo.recipient_phone);
      registerForm.setValue(
        "governorate_id",
        recipientInfo.delivery_address.governorate_id
      );
      registerForm.setValue("area_id", recipientInfo.delivery_address.area_id);
      registerForm.setValue(
        "block_id",
        recipientInfo.delivery_address.block_id
      );
      registerForm.setValue(
        "street_id",
        recipientInfo.delivery_address.street_id
      );
      registerForm.setValue("house", recipientInfo.delivery_address.house);
      registerForm.setValue("notes", recipientInfo.delivery_address.notes);
      registerForm.setValue("avenue", recipientInfo.delivery_address.avenue);
    } else {
      registerForm.setValue("first_name", senderInfo.sender_name_first);
      registerForm.setValue("last_name", senderInfo.sender_name_last);
      registerForm.setValue("phone", senderInfo.sender_phone);
      registerForm.setValue(
        "governorate_id",
        senderInfo.pickup_address.governorate_id
      );
      registerForm.setValue("area_id", senderInfo.pickup_address.area_id);
      registerForm.setValue("block_id", senderInfo.pickup_address.block_id);
      registerForm.setValue("street_id", senderInfo.pickup_address.street_id);
      registerForm.setValue("house", senderInfo.pickup_address.house);
      registerForm.setValue("notes", senderInfo.pickup_address.notes);
      registerForm.setValue("avenue", senderInfo.pickup_address.avenue);
    }
  }, [senderInfo, recipientInfo, registerForm, sender]);

  const handlePinChange = (lat: number, lng: number) => {
    setCords({ lat: lat.toString(), lng: lng.toString() });
    console.log("New position:", { lat, lng });
  };

  const inputBaseClass =
    "bg-customGray-400 placeholder:text-black placeholder:";

  return (
    <Form {...registerForm}>
      <form onSubmit={registerForm.handleSubmit(handelSubmit)}>
        {loading && <Loading />}
        {!sender && (
          <h2 className="col-span-2 text-2xl text-primary ltr:text-left rtl:text-right px-8">
            {t("delivery_question")}
          </h2>
        )}
        <div className="grid grid-cols-2 gap-x-5 gap-y-4 md:px-10 px-5 mt-8">
          <h2 className="col-span-2 text-2xl text-primary ltr:text-left rtl:text-right">
            {sender ? t("sender_information") : t("recipient_information")}{" "}
          </h2>

          <FormField
            name="first_name"
            control={registerForm.control}
            render={({ field }) => (
              <FormItem
                inputClassName={inputBaseClass}
                label={t("first_name")}
                type="text"
                autoComplete="given-name"
                {...field}
              />
            )}
          />
          <FormField
            name="last_name"
            control={registerForm.control}
            render={({ field }) => (
              <FormItem
                inputClassName={inputBaseClass}
                label={t("last_name")}
                type="text"
                autoComplete="family-name"
                {...field}
              />
            )}
          />
          <FormField
            name="phone"
            control={registerForm.control}
            render={({ field }) => (
              <FormItem
                inputClassName={inputBaseClass}
                label={t("phone")}
                containerClassName="col-span-2"
                type="phone"
                autoComplete="phone"
                {...field}
              />
            )}
          />

          <div className="col-span-2">
            <GoogleMap
              lat={Number(cords.lat)}
              lng={Number(cords.lng)}
              onPinChange={handlePinChange}
              apiKey="AIzaSyC4_s7usGvZGoVS3jt1NrjPIfwr4SFjJK8" // Your actual API key
            />
          </div>

          <FormField
            name="governorate_id"
            control={registerForm.control}
            render={({ field }) => (
              <Select
                items={govs}
                value={String(field.value)}
                onChange={(val) => {
                  selectGov(val);
                  field.onChange(Number(val));
                }}
                label={t("governorate")}
              />
            )}
          />

          <FormField
            name="area_id"
            control={registerForm.control}
            render={({ field }) => (
              <Select
                items={state.areas}
                value={String(field.value)}
                onChange={(val) => {
                  selectArea(val);
                  field.onChange(Number(val));
                }}
                label={t("area")}
              />
            )}
          />

          <FormField
            name="block_id"
            control={registerForm.control}
            render={({ field }) => (
              <Select
                items={state.blocks}
                value={String(field.value)}
                onChange={(val) => {
                  selectBlock(val);
                  field.onChange(Number(val));
                }}
                label={t("block")}
              />
            )}
          />

          <FormField
            name="street_id"
            control={registerForm.control}
            render={({ field }) => (
              <Select
                items={state.streets}
                value={String(field.value)}
                onChange={(val) => {
                  field.onChange(Number(val));
                }}
                label={t("street")}
              />
            )}
          />

          <FormField
            name="house"
            control={registerForm.control}
            render={({ field }) => (
              <FormItem
                inputClassName={inputBaseClass}
                label={t("house")}
                type="text"
                autoComplete="house"
                {...field}
              />
            )}
          />

          <FormField
            name="avenue"
            control={registerForm.control}
            render={({ field }) => (
              <FormItem
                inputClassName={inputBaseClass}
                label={t("avenue")}
                type="text"
                autoComplete="avenue"
                required={false}
                {...field}
              />
            )}
          />

          <FormField
            name="notes"
            control={registerForm.control}
            render={({ field }) => (
              <FormItem
                inputClassName={inputBaseClass}
                label={t("notes")}
                type="text"
                containerClassName="col-span-2"
                required={false}
                autoComplete="notes"
                {...field}
              />
            )}
          />

          <Controller
            name="save_address"
            control={registerForm.control}
            render={({ field }) => (
              <Checkbox
                label={t("saveAddress")}
                checked={!!field.value}
                onCheckedChange={(value) => field.onChange(value)}
                id="save_address"
                className="col-span-2 mt-2"
              />
            )}
          />

          <div className="col-span-2 flex">
            {!sender && (
              <Link href="/new-order?step=1">
                <CustomButton className="ml-auto w-[228px]" variant="gray">
                  {t("back")}
                </CustomButton>
              </Link>
            )}
            <CustomButton
              className="ml-auto w-[228px]"
              onClick={registerForm.handleSubmit(handelSubmit)}
            >
              {t("next")}
            </CustomButton>
          </div>
        </div>
      </form>
    </Form>
  );
}
