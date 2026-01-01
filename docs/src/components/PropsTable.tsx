import "./PropsTable.css";

interface Prop {
  name: string;
  type: string;
  default?: string;
  description: string;
}

interface PropsTableProps {
  props: Prop[];
}

export default function PropsTable({ props }: PropsTableProps) {
  return (
    <div className="props-table-container">
      <table className="props-table">
        <thead>
          <tr>
            <th>Prop</th>
            <th>Type</th>
            <th>Default</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {props.map((prop) => (
            <tr key={prop.name}>
              <td>
                <code className="prop-name">{prop.name}</code>
              </td>
              <td>
                <code className="prop-type">{prop.type}</code>
              </td>
              <td>
                {prop.default ? (
                  <code className="prop-default">{prop.default}</code>
                ) : (
                  <span className="prop-none">—</span>
                )}
              </td>
              <td>{prop.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
