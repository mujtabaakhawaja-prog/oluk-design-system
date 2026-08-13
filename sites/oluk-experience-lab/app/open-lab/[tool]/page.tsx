import { SupportContent } from "../../design-system/frontier-sections";
const tools=["evidence","compound-guide","stack-builder","dosing-calculator","cycle-planner","interaction-checker","research-papers","case-studies","glossary","lab-partner"] as const;
export function generateStaticParams(){return tools.map((tool)=>({tool}));}
export default function OpenLabToolPage(){return <SupportContent kind="tool"/>}
