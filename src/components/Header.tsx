export interface TableTitleProps {
  title: string;
  caption: string;
}

export function Header() {
  return <TableTitle title="Cameras" caption="Manage your cameras here" />;
}

export function TableTitle(props: TableTitleProps) {
  return (
    <div
      style={{
        display: 'flex',
        gap: '1rem',
        flexDirection: 'column',
      }}
    >
      <p style={{ fontSize: '1.5rem', margin: 0 }}>{props.title}</p>
      <p style={{ fontSize: '1rem', margin: 0 }}>{props.caption}</p>
    </div>
  );
}
