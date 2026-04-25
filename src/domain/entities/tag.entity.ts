export interface TagProps {
  readonly id?: string;
  publicId: string;
  name: string;
  description: string;
  readonly createdAt?: Date;
}

export class TagEntity {
  constructor(private readonly props: TagProps) {}

  get id(): string | undefined {
    return this.props.id;
  }
  get publicId(): string {
    return this.props.publicId;
  }
  get name(): string {
    return this.props.name;
  }
  get description(): string {
    return this.props.description;
  }
  get createdAt(): Date | undefined {
    return this.props.createdAt;
  }

  update(updates: Partial<TagProps>): TagEntity {
    Object.assign(this.props, updates);
    return this;
  }
}
