//@ts-nocheck
import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";
import {
  Container,
  Header,
  Spacer,
  Content,
  Title,
  SubTitle,
  Tags,
  Tag,
  Footer,
  FooterItem,
} from "../../components/og";

const font = fetch(
  new URL("../../assets/Lato-Regular.ttf", import.meta.url)
).then((res) => res.arrayBuffer());

export const config = { runtime: "edge" };
export default async function og(req: NextRequest) {
  const fontData = await font;

  const { searchParams } = new URL(req.url);
  const hasYear = searchParams.has("year");
  const hasSem = searchParams.has("sem");
  const hasId = searchParams.has("id");
  if (hasYear && hasSem && hasId) {
    const year = searchParams.get("year");
    const sem = searchParams.get("sem");
    const id = searchParams.get("id");
    const departments = await fetch(
      `https://gnehs.github.io/ntut-course-crawler-node/${year}/${sem}/department.json`
    ).then((res) => res.json());
    let className, departmentName, catName;
    for (let d of departments) {
      for (let c of d.class) {
        if (c.id == id) {
          className = c.name;
          departmentName = d.name;
          catName = d.category;
          break;
        }
      }
    }
    if (className) {
      return new ImageResponse(
        (
          <Container>
            <Header>
              <div>{`${year} 年${sem == 1 ? "上" : "下"}學期`}</div>
            </Header>
            <Spacer />
            <Content>
              <Title>{className}</Title>
              <SubTitle>{departmentName}</SubTitle>
            </Content>
            <Spacer />
            <Footer>
              <FooterItem title="學院" value={catName} />
            </Footer>
          </Container>
        ),
        {
          width: 1200,
          height: 600,
          emoji: "fluent",
          fonts: [
            {
              name: "Lato",
              data: fontData,
              style: "normal",
            },
          ],
        }
      );
    }
  }
  return new ImageResponse(
    (
      <Container>
        <Spacer />
        <Content>
          <Title>🍤 北科課程好朋友</Title>
          <SubTitle>ntut-course.gnehs.net</SubTitle>
        </Content>
        <Spacer />
      </Container>
    ),
    {
      width: 1200,
      height: 600,
      emoji: "fluent",
      fonts: [
        {
          name: "Lato",
          data: fontData,
          style: "normal",
        },
      ],
    }
  );
}
