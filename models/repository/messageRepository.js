import { messageInstance } from "../dao/indexDAO.js";
import MessageDTO from "../dto/messageDTO.js";

export default class MessageRepository {
  constructor() {
    this.dao = messageInstance;
  }

  async readFile() {
    const data = await this.dao.readJSONFile();
    console.log('data: ', data)
    const dataDTO = data[0].messages.map((m) => {
      return new MessageDTO(m.authors.email, m.comments.content);
    });
    console.log('dataDTO: ', dataDTO);
    return dataDTO;
  }

  async writeFile(data) {
    this.dao.addMessage(data);
    return new MessageDTO(data);
  }
}
