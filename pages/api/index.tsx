//@ts-nocheck
import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';
import { Container, Header, Spacer, Content, Title, SubTitle, Tags, Tag, Footer, FooterItem } from '../../components/og';

const font = fetch(new URL('../../assets/Lato-Regular.ttf', import.meta.url)).then(
  (res) => res.arrayBuffer(),
);

export const config = {
  runtime: 'edge',
};
export default async function og(req: NextRequest) {
  const fontData = await font;


  const { searchParams } = new URL(req.url)
  const hasYear = searchParams.has('year');
  const hasSem = searchParams.has('sem');
  const hasId = searchParams.has('id');
  if (hasYear && hasSem && hasId) {
    let year = searchParams.get('year');
    let sem = searchParams.get('sem');
    let department = searchParams.get('d') || 'main'
    let id = searchParams.get('id');
    const courses = await fetch(`https://gnehs.github.io/ntut-course-crawler-node/${year}/${sem}/${department}.json`).then((res) => res.json());
    const course = courses.find(x => x.id === id);
    if (course) {
      const courseStandardList = {
        '○': '部訂共同必修',
        '△': '校訂共同必修',
        '☆': '共同選修',
        '●': '部訂專業必修',
        '▲': '校訂專業必修',
        '★': '專業選修'
      }
      const courseStandard = `📕 ${courseStandardList[course.courseType]}`
      return new ImageResponse(
        (
          <Container>
            <Header>
              <div>{`${year} 年${sem == 1 ? '上' : '下'}學期`}</div>
            </Header>
            <Spacer />
            <Content>
              {course.id}
              <Title>
                {course.name.zh}
              </Title>
              <SubTitle>
                {course.name.en}
              </SubTitle>
              <Tags>
                <Tag>{courseStandard}</Tag>
                <Tag>{`🎓 ${parseFloat(course.credit)} 學分`}</Tag>
                {course.classroom.map(x => `🚪 ${x.name}`).map(x =>
                  <Tag key={x}>{x}</Tag>
                )}
              </Tags>
            </Content>
            <Spacer />
            <Footer>
              <FooterItem title="教師" value={course.teacher.map(x => x.name).join('、')} />
              <FooterItem title="班級" value={course.class.map(x => x.name).join('、')} />
              <FooterItem title="備註" value={course.notes} />
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