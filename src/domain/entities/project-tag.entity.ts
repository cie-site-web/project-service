export interface ProjectTagProps {
  readonly id?: string;
  publicId: string;
  projectId: string;
  tagsId: string;
  readonly createdAt?: Date;
}

export class ProjectTagEntity {
  constructor(private readonly props: ProjectTagProps) {}

  get id(): string | undefined {
    return this.props.id;
  }
  get publicId(): string {
    return this.props.publicId;
  }
  get projectId(): string {
    return this.props.projectId;
  }
  get tagsId(): string {
    return this.props.tagsId;
  }
  get createdAt(): Date | undefined {
    return this.props.createdAt;
  }

  update(updates: Partial<ProjectTagProps>): ProjectTagEntity {
    Object.assign(this.props, updates);
    return this;
  }
}
