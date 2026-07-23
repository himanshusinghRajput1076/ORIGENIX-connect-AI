export class OutreachGenerator {
  public async generateOutreach(pitch: string, investorThesis: string, recipientRole: string): Promise<any> {
    return {
      emailDraft: `Subject: Opportunity in ${pitch}\n\nHi,\n\nGiven your focus on ${investorThesis} as a ${recipientRole}, I thought this might be a great fit.`,
      linkedInDraft: `Hi, I saw your investments in ${investorThesis}. As a ${recipientRole}, you might find our work on ${pitch} interesting. Let's connect!`,
    };
  }
}
