import { CoaViewer } from "../../../design-system/openlab-frontier";
import { GovernedProgramShell } from "../../../experience-lab";
import { notFound } from "next/navigation";

export function generateStaticParams(){return [{id:"r28868"}];}

export default async function CoaPage({params}:{params:Promise<{id:string}>}){
  const {id}=await params;
  if(id!=="r28868")return notFound();
  return <GovernedProgramShell><CoaViewer id={id}/></GovernedProgramShell>;
}
