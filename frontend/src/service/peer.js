class PeerService {
    constructor() {
      if (!this.peer) {
        this.peer = new RTCPeerConnection({
          iceServers: [
            {
              urls: "stun:stun.relay.metered.ca:80",
            },
            {
              urls: "turn:global.relay.metered.ca:80",
              username: "d655d0a142700c7cb7ea4cff",
              credential: "lanQJ17MFDAyl/DS",
            },
            {
              urls: "turn:global.relay.metered.ca:80?transport=tcp",
              username: "d655d0a142700c7cb7ea4cff",
              credential: "lanQJ17MFDAyl/DS",
            },
            {
              urls: "turn:global.relay.metered.ca:443",
              username: "d655d0a142700c7cb7ea4cff",
              credential: "lanQJ17MFDAyl/DS",
            },
            {
              urls: "turns:global.relay.metered.ca:443?transport=tcp",
              username: "d655d0a142700c7cb7ea4cff",
              credential: "lanQJ17MFDAyl/DS",
            },
        ],
          iceTransportPolicy: "all",
          // Try both STUN and TURN
        });
  
        // Error handling
        this.peer.onicecandidateerror = (error) => {
          console.warn("ICE candidate error:", error);
        };
  
        this.peer.oniceconnectionstatechange = () => {
          if (this.peer.iceConnectionState === "failed") {
            console.error("ICE connection failed - consider restarting");
          }
        };
      }
    }
  
    async getOffer() {
      try {
        if (!this.peer) throw new Error("PeerConnection not initialized");
        
        const offer = await this.peer.createOffer({
          offerToReceiveAudio: true,
          offerToReceiveVideo: true
        });
        
        await this.peer.setLocalDescription(offer);
        return offer;
      } catch (error) {
        console.error("Offer creation failed:", error);
        throw error;
      }
    }
  
    async getAnswer(offer) {
      try {
        if (!this.peer) throw new Error("PeerConnection not initialized");
        
        await this.peer.setRemoteDescription(offer);
        const answer = await this.peer.createAnswer();
        await this.peer.setLocalDescription(answer);
        return answer;
      } catch (error) {
        console.error("Answer creation failed:", error);
        throw error;
      }
    }
  
    async setRemoteDescription(answer) {
      try {
        if (!this.peer) throw new Error("PeerConnection not initialized");
        await this.peer.setRemoteDescription(answer);
      } catch (error) {
        console.error("Failed to set remote description:", error);
        throw error;
      }
    }
  
    close() {
      if (this.peer) {
        this.peer.close();
        this.peer = null;
      }
    }
  }
  
  export default new PeerService();