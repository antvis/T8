import { Row, Col, Anchor } from 'antd';
import { useMedia } from 'react-use';

interface AnchorLink {
  href: string;
  title: string;
  children?: AnchorLink[];
}

interface Props {
  anchorLinks: AnchorLink[];
}

const Link: React.FC<{ link: AnchorLink }> = ({ link }) => {
  return (
    <Anchor.Link href={link.href} title={link.title} key={link.href}>
      {link?.children?.map((l) => (
        <Link key={l.href} link={l} />
      ))}
    </Anchor.Link>
  );
};

const AnchorLayout: React.FC<Props> = ({ children, anchorLinks }) => {
  const isWide = useMedia('(min-width: 767.99px)', true);

  return (
    <Row wrap={false}>
      <Col flex="auto">
        <div className="container">{children}</div>
      </Col>
      {isWide ? (
        <Col flex="120px">
          <Anchor>
            {anchorLinks.map((link) => (
              <Link key={link.href} link={link} />
            ))}
          </Anchor>
        </Col>
      ) : null}
    </Row>
  );
};

export default AnchorLayout;
