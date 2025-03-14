import { redirect } from "next/navigation";

export default function Home() {
  const empData = {
          nom: 'info',
          telephone: [
              { number: '222222222' },
          ],
      };
  
      redirect("/Client");
}
