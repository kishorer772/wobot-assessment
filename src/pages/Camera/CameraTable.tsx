import { flexRender, Table } from '@tanstack/react-table';
import { CameraProps } from '../../types/camera';

export interface IAppProps {
  cameraTable: Table<CameraProps>;
}

export function CameraTable(props: IAppProps) {
  const { cameraTable } = props;
  return (
    <table
      style={{
        width: 'calc(100% - 64px)',
        paddingBlock: '1rem',
      }}
    >
      <thead>
        {cameraTable.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th
                key={header.id}
                style={{
                  paddingBlock: '1rem',
                  position: 'sticky',
                  top: 0,
                  backgroundColor: 'white',
                  zIndex: 100,
                }}
              >
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody
        style={{
          overflowY: 'auto',
          maxHeight: window.innerWidth < 1500 ? '50vh' : '70vh',
        }}
      >
        {cameraTable.getRowModel().rows.map((row) => (
          <tr
            key={row.id}
            style={{
              outline: '1px solid gray !important',
            }}
          >
            {row.getVisibleCells().map((cell) => (
              <td
                key={cell.id}
                style={{
                  // textAlign: 'center',
                  paddingBlock: '0.25rem',
                  zIndex: 99,
                }}
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
