import { getAllCosmogonies } from "@/data/cosmogonies";
import { List } from "@/components/List";
import { ListItem } from "@/components/ListItem";
import { Page } from "@/components/Page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cosmogonies",
};

export default async function Home() {
  const cosmogonies = await getAllCosmogonies();

  return (
    <Page title="Cosmogonies">
      <List>
        {cosmogonies.map((cosmogony) => (
          <ListItem
            key={cosmogony.id}
            title={cosmogony.name}
            href={cosmogony.slug}
          />
        ))}
      </List>
    </Page>
  );
}
