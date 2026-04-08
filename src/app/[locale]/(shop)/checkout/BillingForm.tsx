"use client";
import CustomField from "@/components/common/Formik/CustomField";
import { formDataProp } from "@/types/formData";
import { Form, Formik } from "formik";
import { useCreateAddress } from "@/hooks/checkout/useCreateAddress";
import { AddressType } from "@/types/AddressType";

import { useTranslations } from "next-intl";

interface Props {
  formRef: React.RefObject<HTMLFormElement | null>;
}

const BillingForm = ({ formRef }: Props) => {
  const t = useTranslations("shop.checkout.billing");
  const { mutate: addressMutate } = useCreateAddress();
  
  const fieldData: formDataProp[] = [
    { name: "name", type: "text", placeholder: t("first_name") },
    {
      name: "state",
      type: "text",
      placeholder: t("country"),
    },
    { name: "street", type: "text", placeholder: t("street") },
    {
      name: "country",
      type: "text",
      placeholder: t("apartment"),
    },
    { name: "city", type: "text", placeholder: t("city") },
    {
      name: "phone",
      type: "string",
      placeholder: t("phone"),
    },
    {
      name: "zipCode",
      type: "string",
      placeholder: "Zip Code",
    },
  ];

  const initialValues: AddressType = {
    id: "",
    name: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
  };

  const FormSubmit = (value: AddressType) => {
    addressMutate(value);
    console.log(value, " submitted");
  };

  return (
    <section className="w-2/4 ">
      <h1 className="text-3xl font-medium mb-5 ">{t("title")}</h1>
      <Formik onSubmit={FormSubmit} initialValues={initialValues}>
        <Form ref={formRef}>
          {fieldData.map((input, index) => {
            return (
              <div key={index} className="flex flex-col gap-1">
                <CustomField
                  className={`inputs border-b-0 bg-[#e0e0e0] rounded-md`}
                  type={input.type}
                  name={input.name}
                  placeholder={input.placeholder}
                />
              </div>
            );
          })}
        </Form>
      </Formik>
    </section>
  );
};


export default BillingForm;
