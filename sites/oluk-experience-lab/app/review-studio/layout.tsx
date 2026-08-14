import type { Metadata } from "next";

export const metadata:Metadata={title:"Champion Review Studio",description:"Owner-only governed Sites review surface.",robots:{index:false,follow:false}};
export default function ReviewStudioLayout({children}:{children:React.ReactNode}){return children;}
