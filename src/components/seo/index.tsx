import { Head } from "next/document";

type Props = {
  description?: string;
  title?: string;
};

export default function Seo({ description, title }: Props) {
  return (
    <Head>
      <title>{title || "readit the front page of internet"}</title>
      <meta
        name="description"
        content={
          description ||
          "Reddit is a network of communities based on people's interests. Find communities you're interested in, and become part of an online community!"
        }
      />
      <meta
        property="og:description"
        content={
          description ||
          "Reddit is a network of communities based on people's interests. Find communities you're interested in, and become part of an online community!"
        }
      />
      <meta
        property="og:title"
        content={title || "readit the front page of internet"}
      />
      <meta
        property="twitter:title"
        content={title || "readit the front page of internet"}
      />
      <meta
        property="og:description"
        content={
          title ||
          "Reddit is a network of communities based on people's interests. Find communities you're interested in, and become part of an online community!"
        }
      />
    </Head>
  );
}
