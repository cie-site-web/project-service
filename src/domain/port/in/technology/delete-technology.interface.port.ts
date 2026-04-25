export interface DeleteTechnologyCommand {
  publicId: string;
}

export interface DeleteTechnologyInterfacePort {
  execute(command: DeleteTechnologyCommand): Promise<void>;
}
