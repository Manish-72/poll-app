import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PollService } from '../poll.service';
import { Poll } from '../poll.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-poll',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './poll.component.html',
  styleUrl: './poll.component.css',
})
export class PollComponent implements OnInit {
  voted: Set<number> = new Set();
  newPoll: Poll = {
    question: '',
    options: [
      { optionText: '', voteCount: 0 },
      { optionText: '', voteCount: 0 },
    ]
  };

  polls: Poll[] = []

  constructor(
    private pollService: PollService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadPolls();
  }

  loadPolls() {
    this.pollService.getPolls().subscribe({
      next: (data) => {
        this.polls = data;
        this.cd.detectChanges();  
      }
    });
  }

  addOption() {
    this.newPoll.options.push({ optionText: '', voteCount: 0 });
  }

  removeOption(index: number) {
    this.newPoll.options.splice(index, 1);
  }

  createPoll() {
    this.pollService.cratePoll(this.newPoll).subscribe({
      next: (data) => { 
        this.polls.push(data);

        // reset form
        this.newPoll = {
          question: '',
          options: [
            { optionText: '', voteCount: 0 },
            { optionText: '', voteCount: 0 }
          ]
        };
      },
      error: (err) => {
        console.error("Create poll error:", err);
      }
    });
  }

  vote(pollId: number, optionIndex: number) {
    this.pollService.vote(pollId, optionIndex).subscribe({
      next: () => {
        this.loadPolls();
      },
      error: (err) => {
        console.error("Vote error:", err);
      }
    });

    this.voted.add(pollId);
  }

  trackByIndex(index: number): number {
    return index;
  }

}
