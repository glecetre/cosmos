import { List } from "@/components/List";
import { ListItem } from "@/components/ListItem";
import { Page } from "@/components/Page";
import { getCosmogonyBySlug } from "@/data/cosmogonies";

export default async function CosmogonyPage(props: {
  params: { cosmogony: string };
}) {
  const cosmogony = await getCosmogonyBySlug(props.params.cosmogony);

  return (
    <Page title={cosmogony.name} subtitle="Cosmogony">
      <List>
        <ListItem
          title="Chronicles"
          subtitle={`3 entries`}
          href="./chronicles"
        />
        <ListItem
          title="Characters"
          subtitle={`13 entries`}
          href="./characters"
        />
      </List>
    </Page>
  );
}
