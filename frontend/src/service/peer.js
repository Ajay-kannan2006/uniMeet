// PeerService.js
class PeerService {
  constructor() {
    this.peer = new RTCPeerConnection({
      // iceServers:iceServers,
      // iceTransportPolicy: "all",
    });
  }

  async init() {
    if (!this.peer) {
      const iceServers = await this.fetchIceServers();

      this.peer = new RTCPeerConnection({
        // iceServers:iceServers,
        // iceTransportPolicy: "all",
      });

      this.peer.onicecandidateerror = (error) => {
        console.warn("ICE candidate error:", error);
      };

      this.peer.oniceconnectionstatechange = () => {
        if (this.peer.iceConnectionState === "failed") {
          console.error("ICE connection failed - consider restarting");
        }
      };
    }

    return this;
  }

  async fetchIceServers() {
    try {
      const response = await fetch(
        "https://ajay.metered.live/api/v1/turn/credentials?apiKey=3adc396e713c3471d535c962fe1cd6a49685"
      );
      const data = await response.json();
      return data;
    } catch (err) {
      console.error("Failed to fetch ICE servers:", err);
      return []; // fallback to no servers if needed
    }
  }

  async getOffer() {
    if (!this.peer) throw new Error("PeerConnection not initialized");
    const offer = await this.peer.createOffer({
      offerToReceiveAudio: true,
      offerToReceiveVideo: true,
    });
    await this.peer.setLocalDescription(offer);
    return offer;
  }

  async getAnswer(offer) {
    if (!this.peer) throw new Error("PeerConnection not initialized");
    await this.peer.setRemoteDescription(offer);
    const answer = await this.peer.createAnswer();
    await this.peer.setLocalDescription(answer);
    return answer;
  }

  async setRemoteDescription(answer) {
    if (!this.peer) throw new Error("PeerConnection not initialized");
    await this.peer.setRemoteDescription(answer);
  }

  close() {
    if (this.peer) {
      this.peer.close();
      this.peer = null;
    }
  }
}

export default new PeerService();
