//@ts-nocheck
import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';
import { Container, Header, Spacer, Content, Title, SubTitle, Tags, Tag, Footer, FooterItem } from '../../components/og';

const font = fetch(new URL('../../assets/Lato-Regular.ttf', import.meta.url)).then(res => res.arrayBuffer());

export const config = { runtime: 'edge' };
export default async function og(req: NextRequest) {
  const fontData = await font;

  const { searchParams } = new URL(req.url)
  const hasName = searchParams.has('name');
  if (hasName) {
    const name = searchParams.get('name');
    const withdrawal = await fetch(`https://gnehs.github.io/ntut-course-crawler-node/analytics/withdrawal.json`).then((res) => res.json());
    const teacher = withdrawal.data.find(x => x.name == name);
    if (teacher) {
      return new ImageResponse(
        (
          <Container>
            <Header />
            <Spacer />
            <Content>
              <Title>
                {teacher.name}
              </Title>
              <SubTitle>
                教師
              </SubTitle>
              <Tags>
                <Tag>{`🎓 ${teacher.course.length} 堂課程`}</Tag>
              </Tags>
            </Content>
            <Spacer />
            <Footer>
              <FooterItem title="退選率" value={`${teacher.rate_percent}%`} />
              <FooterItem title="退選" value={`${teacher.withdraw} 人`} />
              <FooterItem title="選課" value={`${teacher.people} 人`} />
            </Footer>
          </Container>
        ),
        {
          width: 1200,
          height: 600,
          emoji: "fluent",
          fonts: [
            {
              name: 'Lato',
              data: fontData,
              style: 'normal',
            },
          ],
        },
      );
    }
  }
  return new ImageResponse(
    (
      <Container>
        <Spacer />
        <Content>
          <Title>
            🍤 北科課程好朋友
          </Title>
          <SubTitle>
            ntut-course.gnehs.net
          </SubTitle>
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
          name: 'Lato',
          data: fontData,
          style: 'normal',
        },
      ],
    },
  );



}