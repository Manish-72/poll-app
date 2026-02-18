package com.voting.votingApp.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.voting.votingApp.model.Poll;
import com.voting.votingApp.repositotry.PollRepository;

@Service
public class PollService {

    @Autowired
    private PollRepository pollRepository;

    public Poll createPoll(Poll poll) {
        return pollRepository.save(poll); 
    }

    public List<Poll> getAllPolls() {
        return pollRepository.findAll();
    }

    public Optional<Poll> getPollById(Long id) {
        return pollRepository.findById(id);
    }

    public void vote(Long pollId, int optionIndex) {
        Optional<Poll> pollOpt = pollRepository.findById(pollId);
        if (pollOpt.isPresent()) {
            Poll poll = pollOpt.get();
            if (optionIndex >= 0 && optionIndex < poll.getOptions().size()) {
                poll.getOptions().get(optionIndex).incrementVotes();
                pollRepository.save(poll);
            }
        }
    }

}
