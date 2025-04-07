import { getQueryParams } from "@/lib/url";
import ClientPage from "./clientPage";

async function page({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | '' }> }) {
  const params = await searchParams;

  
  const quereParams= getQueryParams(params)
  console.log('paa',quereParams);
  return (
    <div>
      <ClientPage params={quereParams} />
    </div>
  );
}

export default page