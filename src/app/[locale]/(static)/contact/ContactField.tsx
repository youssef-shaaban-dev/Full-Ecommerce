import { Formik, Form, Field, ErrorMessage } from "formik";
import "@/styles/contact/contact.scss";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

const ContactField = () => {
  const t = useTranslations("contact.form");

  const initialValues = {
    YourName: "",
    YourEmail: "",
    YourPhone: "",
  };

  function submit() {
    console.log("submitted");
  }

  return (
    <div className=" py-8 px-7 bg-slate-50 border-inline-end-4 shadow-lg contactForm">
      <Formik initialValues={initialValues} onSubmit={submit}>
        <Form className="flex flex-col gap-10">
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            <div>
              <Field
                name="name"
                className="p-2 border rounded bg-gray-100  custom-large:w-[120px]  formik-field  "
                placeholder={t("name")}
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div>
              <Field
                type="email"
                name="email"
                className=" p-2 border rounded bg-gray-100  custom-large:w-[120px]  formik-field "
                placeholder={t("email")}
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div>
              <Field
                type="tel"
                name="phone"
                className=" p-2 border rounded bg-gray-100  custom-large:w-[120px] formik-field "
                placeholder={t("phone")}
              />
              <ErrorMessage
                name="phone"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
          </div>

          <div className="w-[100%] flex flex-col gap-2">
            <Field
              type="textarea"
              as="textarea"
              name="message"
              className="w-[100%] h-[207px] text-start p-2 border rounded bg-gray-100 resize-none formik-field"
              placeholder={t("message")}
            />
            <ErrorMessage
              name="textarea"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>
          <div className=" place-self-end">
            <Button className="px-10 py-3 text-xs font-thin">
              {t("send")}
            </Button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};


export default ContactField;
