import { Formik, Form, Field, ErrorMessage } from "formik";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

const ContactField = () => {
  const t = useTranslations("contact.form");

  const initialValues = {
    name: "",
    email: "",
    phone: "",
    message: "",
  };

  function submit(values: { name: string; email: string; phone: string; message: string }) {
    console.log("submitted", values);
  }

  return (
    <div className="py-8 px-7 bg-slate-50 shadow-lg w-full lg:flex-1 rounded-sm">
      <Formik initialValues={initialValues} onSubmit={submit}>
        <Form className="flex flex-col gap-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="flex flex-col gap-1">
              <Field
                name="name"
                className="p-3 border rounded bg-gray-100 w-full outline-none focus:ring-1 focus:ring-primary-red transition-all"
                placeholder={t("name")}
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div className="flex flex-col gap-1">
              <Field
                type="email"
                name="email"
                className="p-3 border rounded bg-gray-100 w-full outline-none focus:ring-1 focus:ring-primary-red transition-all"
                placeholder={t("email")}
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div className="flex flex-col gap-1">
              <Field
                type="tel"
                name="phone"
                className="p-3 border rounded bg-gray-100 w-full outline-none focus:ring-1 focus:ring-primary-red transition-all"
                placeholder={t("phone")}
              />
              <ErrorMessage
                name="phone"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
          </div>

          <div className="w-full flex flex-col gap-2">
            <Field
              type="textarea"
              as="textarea"
              name="message"
              className="w-full h-[207px] text-start p-3 border rounded bg-gray-100 resize-none outline-none focus:ring-1 focus:ring-primary-red transition-all"
              placeholder={t("message")}
            />
            <ErrorMessage
              name="message"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>
          <div className="place-self-end">
            <Button className="px-10 h-10 bg-primary-red hover:bg-red-700 text-white transition-colors">
              {t("send")}
            </Button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default ContactField;
