import { CoaViewer } from "../../../design-system/openlab-frontier";
import { GovernedProgramShell } from "../../../experience-lab";

export function generateStaticParams(){return [{id:"r28868"}];}

export default async function CoaPage({params}:{params:Promise<{id:string}>}){
  const {id}=await params;
  return <GovernedProgramShell><CoaViewer id={id}/></GovernedProgramShell>;
}
