import CodePreview from "../../components/CodePreview";
import PropsTable from "../../components/PropsTable";
import { Avatar } from "../../../../src/react";
import "../GettingStarted.css";

const avatarProps = [
  {
    name: "src",
    type: "string",
    default: "undefined",
    description: "URL of the avatar image",
  },
  {
    name: "alt",
    type: "string",
    default: '""',
    description: "Alt text for the image",
  },
  {
    name: "fallback",
    type: "string",
    default: "undefined",
    description: "Text to generate initials from when image is unavailable",
  },
  {
    name: "size",
    type: '"sm" | "md" | "lg"',
    default: '"md"',
    description: "Size of the avatar",
  },
];

export default function AvatarPage() {
  return (
    <article className="docs-page">
      <h1>Avatar</h1>
      <p className="lead">
        A circular avatar component with image and fallback support.
      </p>

      <h2>With Image</h2>
      <CodePreview
        code={`<Avatar src="https://i.pravatar.cc/150?img=1" alt="John Doe" />`}
      >
        <Avatar src="https://i.pravatar.cc/150?img=1" alt="John Doe" />
      </CodePreview>

      <h2>Fallback Initials</h2>
      <CodePreview
        code={`<Avatar fallback="John Doe" />
<Avatar fallback="Alice Smith" />
<Avatar fallback="Bob" />`}
      >
        <Avatar fallback="John Doe" />
        <Avatar fallback="Alice Smith" />
        <Avatar fallback="Bob" />
      </CodePreview>

      <h2>Sizes</h2>
      <CodePreview
        code={`<Avatar size="sm" fallback="SM" />
<Avatar size="md" fallback="MD" />
<Avatar size="lg" fallback="LG" />`}
      >
        <Avatar size="sm" fallback="SM" />
        <Avatar size="md" fallback="MD" />
        <Avatar size="lg" fallback="LG" />
      </CodePreview>

      <h2>With Image Sizes</h2>
      <CodePreview
        code={`<Avatar size="sm" src="https://i.pravatar.cc/150?img=2" />
<Avatar size="md" src="https://i.pravatar.cc/150?img=3" />
<Avatar size="lg" src="https://i.pravatar.cc/150?img=4" />`}
      >
        <Avatar size="sm" src="https://i.pravatar.cc/150?img=2" />
        <Avatar size="md" src="https://i.pravatar.cc/150?img=3" />
        <Avatar size="lg" src="https://i.pravatar.cc/150?img=4" />
      </CodePreview>

      <h2>Props</h2>
      <PropsTable props={avatarProps} />
    </article>
  );
}
