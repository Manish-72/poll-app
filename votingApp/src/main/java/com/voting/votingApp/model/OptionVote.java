package com.voting.votingApp.model;

import jakarta.persistence.Embeddable;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Embeddable
public class OptionVote {
    private String optionText;
    private Long voteCount = 0L;
    
    public void incrementVotes() {
        this.voteCount++;
    }

    add_user(string username){
        this.userData.add(username);
    }
}



// step -1 user is login username
// step poll page is visible user
// user choose option -( vote call userData ) another field usename (add_username -> username)








