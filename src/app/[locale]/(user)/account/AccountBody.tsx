"use client";
import { Button } from "@/components/ui/button";
import { Formik, Form, Field, ErrorMessage } from "formik";

const AccountBody = () => {
  const initialValues = {
    FirstName: "",
    LastName: "",
    email: "",
    address: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  function submit() {
    console.log("submitted");
  }
  return  (
    <div className="bg-slate-50 shadow-md shadow-slate-200 py-8 px-20 rounded-sm custom-phone:px-5">
      <h3>Edit Your Profile</h3>
      <Formik initialValues={initialValues} onSubmit={submit}>
        <Form className="flex flex-col gap-10">
          <div className="flex justify-between gap-2  custom-phone:flex-col">
            <div className="flex flex-col gap-2">
              <label className=" text-gray-700">FirstName</label>
              <Field
                type="text"
                name="name"
                className="w-[300px] p-3 border rounded bg-slate-200 tab-large-screen:w-[200px] custom-mid:p-2 custom-mid:w-[120px] custom-phone:!w-max"
                placeholder="name"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className=" text-gray-700">LastName</label>
              <Field
                type="text"
                name="lastName"
                className="w-[300px] p-3 border rounded bg-slate-200 tab-large-screen:w-[200px] custom-mid:p-2 custom-mid:w-[120px] custom-phone:!w-max"
                placeholder="lastName"
              />
              <ErrorMessage
                name="lastName"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
          </div>
          <div className="flex justify-between gap-2 custom-phone:flex-col">
            <div className="flex flex-col gap-2">
              <label className=" text-gray-700">Email</label>
              <Field
                type="email"
                name="email"
                className="w-[300px] p-3 border rounded bg-slate-200 tab-large-screen:w-[200px] custom-mid:p-2 custom-mid:w-[120px] custom-phone:!w-max"
                placeholder="email"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className=" text-gray-700">Address</label>
              <Field
                type="text"
                name="Address"
                className="w-[300px] p-3 border rounded bg-slate-200 tab-large-screen:w-[200px] custom-mid:p-2 custom-mid:w-[120px] custom-phone:!w-max"
                placeholder="Address"
              />
              <ErrorMessage
                name="Address"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
          </div>
          <div className="flex justify-between gap-2">
            <div className="w-[100%] flex flex-col gap-2">
              <label className=" text-gray-700">Password Changes</label>
              <Field
                type="password"
                name="password"
                className="w-[100%] p-3 border rounded bg-slate-200"
                placeholder="Current Password"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
              <Field
                type="password"
                name="password"
                className="w-[100%] p-3 border rounded bg-slate-200"
                placeholder="New Password"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
              <Field
                type="password"
                name="password"
                className="w-[100%] p-3 border rounded bg-slate-200"
                placeholder="Confirm New Password"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
          </div>
          <div className="flex flex-row-reverse gap-3 ">
            <Button className="px-10 py-3 text-xs font-thin"> Save Changes</Button>
            <button className="border-0 ">Cancel</button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default AccountBody;
