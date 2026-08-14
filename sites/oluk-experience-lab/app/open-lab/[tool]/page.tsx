import { notFound } from "next/navigation";
import { GovernedProgramShell } from "../../experience-lab";
import { OpenLabFrontierPage, openLabFrontierTools, type OpenLabFrontierTool } from "../../design-system/openlab-frontier";
import { YourStackBuilder } from "../../design-system/your-stack-builder";

export function generateStaticParams(){return openLabFrontierTools.map((tool)=>({tool}));}

export default async function OpenLabToolPage({params}:{params:Promise<{tool:string}>}){
  const {tool}=await params;
  if(!openLabFrontierTools.includes(tool as OpenLabFrontierTool)) notFound();
  if(tool === "stack-builder") return <GovernedProgramShell><YourStackBuilder/></GovernedProgramShell>;
  return <GovernedProgramShell><OpenLabFrontierPage tool={tool as OpenLabFrontierTool}/></GovernedProgramShell>;
}
