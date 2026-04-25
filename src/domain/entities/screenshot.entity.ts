export interface ScreenshotProps {
  readonly id?: string;
  publicId: string;
  projectId: string;
  imageUrl: string;
  readonly createdAt?: Date;
}

export class ScreenshotEntity {
  constructor(private readonly props: ScreenshotProps) {}

  get id(): string | undefined { return this.props.id; }
  get publicId(): string { return this.props.publicId; }
  get projectId(): string { return this.props.projectId; }
  get imageUrl(): string { return this.props.imageUrl; }
  get createdAt(): Date | undefined { return this.props.createdAt; }

  update(updates: Partial<ScreenshotProps>): ScreenshotEntity {
    Object.assign(this.props, updates);
    return this;
  }
}
