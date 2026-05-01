import Activity from "@/app/features/activity/components/activity.component";
import { CAMPAIGN_CATEGORIES } from "@/app/features/campaigns/campaign.config";
import Layout from "@/app/layouts/layout";
import Link from "next/link";

export default function Dashboard() {
  const categories = Object.values(CAMPAIGN_CATEGORIES);

  return (
    <Layout>
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {categories.map((category) => (
          <Link
            key={category.key}
            href={`/${category.key}`}
            className="group overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="space-y-2 p-4"> 
              <div className={`h-1 w-10 rounded-full ${category.accent}`} />
              <h2 className="font-bold text-gray-950">{category.title}</h2>
              <p className="text-sm leading-5 text-gray-500">
                {category.description}
              </p>
            </div>
          </Link>
        ))}
      </section>

      <section className="mt-8">
        <Activity />
      </section>
    </Layout>
  );
}