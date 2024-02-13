export class MommyLetterWS {
    private static instance: MommyLetterWS;
    public header = this.createHeader();

    static getInstance(): MommyLetterWS {
        return this.instance || (this.instance = new this());
    }

    private createHeader(token?: string): Record<string, string> {
        const result: Record<string, string> = {};
        if (token) {
            result.Auth = token;
        } else if (localStorage.getItem("Auth")) {
            result.Auth = localStorage.getItem("Auth")!;
        }

        return result;
    }
    getUserInfo(): { nickname?: string, userId?: string } {
        const authObject = JSON.parse(this.header.Auth || "{}");
        return {
            nickname: authObject.nickname,
            userId: authObject.userId
        };
    }
    // login(newToken: string) {
    //     this.header = this.createHeader(newToken);
    // }
    //
    // logout() {
    //     this.header = this.createHeader();
    // }
}
