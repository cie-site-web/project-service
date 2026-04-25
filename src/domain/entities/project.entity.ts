export interface ProjectProps {
  readonly id?: string;
  publicId: string;
  title: string;
  description: string;
  githubUrl: string;
  addressUrl: string;
  isPublic: boolean;
  technologiesId: string;
  readonly createdAt?: Date;
}

export class ProjectEntity {
  constructor(private readonly props: ProjectProps) {}

  get id(): string | undefined {
    return this.props.id;
  }
  get publicId(): string {
    return this.props.publicId;
  }
  get title(): string {
    return this.props.title;
  }
  get description(): string {
    return this.props.description;
  }
  get githubUrl(): string {
    return this.props.githubUrl;
  }
  get addressUrl(): string {
    return this.props.addressUrl;
  }
  get isPublic(): boolean {
    return this.props.isPublic;
  }
  get technologiesId(): string {
    return this.props.technologiesId;
  }
  get createdAt(): Date | undefined {
    return this.props.createdAt;
  }

  update(updates: Partial<ProjectProps>): ProjectEntity {
    Object.assign(this.props, updates);
    return this;
  }
}
