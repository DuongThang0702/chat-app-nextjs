import Image from "next/image";
import { ToastContainer } from "react-toastify";

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative w-full h-screen overflow-y-hidden">
      <div className="absolute left-0 right-0 bottom-0 top-0 -z-50">
        <Image src={"/login.jpg"} alt="image" height={1080} width={1920} />
      </div>
      <>{children}</>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}
