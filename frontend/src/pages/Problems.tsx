import React, { useState, useEffect } from "react";
import { 
  IonPage, IonContent, IonItem, IonLabel, IonCheckbox, 
  IonAccordion, IonAccordionGroup, IonList 
} from "@ionic/react";

const questionCategories = [
    {
        topic: "Sorting Techniques",
        questions: [
          { id: 1, title: "Selection Sorting", url: "https://www.geeksforgeeks.org/problems/selection-sort/1?utm_source=youtube&utm_medium=collab_striver_ytdescription&utm_campaign=selection-sort" },
          { id: 2, title: "Bubble Sort", url: "https://www.geeksforgeeks.org/problems/bubble-sort/1?utm_source=youtube&utm_medium=collab_striver_ytdescription&utm_campaign=bubble-sort" },
          { id: 3, title: "Insertion Sort", url: "https://www.geeksforgeeks.org/problems/insertion-sort/0?category%5B%5D=Algorithms&page=1&query=category%5B%5DAlgorithmspage1&utm_source=youtube&utm_medium=collab_striver_ytdescription&utm_campaign=insertion-sort" },
          {id:4 , title:"Merge Sort", url:"https://www.geeksforgeeks.org/problems/merge-sort/1?utm_source=youtube&utm_medium=collab_striver_ytdescription&utm_campaign=merge-sort"}
        ],
      },
  {
    topic: "Linked List",
    questions: [
      { id: 5, title: "Reverse Linked List", url: "https://leetcode.com/problems/reverse-linked-list/" },
      { id: 6, title: "Merge Two Sorted Lists", url: "https://leetcode.com/problems/merge-two-sorted-lists/" },
      {id: 7,title:"Detect a cycle in Linked List", url:"https://leetcode.com/problems/linked-list-cycle/description/"},
      {id: 8,title:"Merge K sorted arrays", url:"https://www.naukri.com/code360/problems/merge-k-sorted-arrays_975379"},
      { id: 9, title: "Remove Nth Node From End of List", url: "https://leetcode.com/problems/remove-nth-node-from-end-of-list/" },
    ],
  },
  {
    topic: "Arrays",
    questions: [
        {id:10,title:"next-permutation",url:"https://leetcode.com/problems/next-permutation/description/"},
      { id: 11, title: "Two Sum", url: "https://leetcode.com/problems/two-sum/" },
      { id: 12, title: "Best Time to Buy and Sell Stock", url: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/" },
      {id: 13,title:"Kadane's Algorithm", url:"https://leetcode.com/problems/maximum-subarray/description/"},
      {id: 14,title:"Majority Element (n/3 times) ", url:"https://leetcode.com/problems/majority-element-ii/description/"},
      {id: 15,title:"Count number of subarrays with given xor K", url:"https://www.interviewbit.com/problems/subarray-with-given-xor/"},
      {id: 16,title:"Find the repeating and missing number", url:"https://www.geeksforgeeks.org/problems/find-missing-and-repeating2512/1?utm_source=youtube&utm_medium=collab_striver_ytdescription&utm_campaign=find-missing-and-repeating"},
      {id: 17,title:"Count Inversions", url:"https://www.geeksforgeeks.org/problems/inversion-of-array-1587115620/1?utm_source=youtube&utm_medium=collab_striver_ytdescription&utm_campaign=inversion-of-array"},
      {id: 18,title:"Maximum Product Subarray", url:"https://leetcode.com/problems/maximum-product-subarray/description/"},
      {id: 19,title:"Pascal's Triangle", url:"https://leetcode.com/problems/pascals-triangle/"},
    ],
  },
  {
    topic: "Stack",
    questions: [
      { id: 20, title: "Next Greater Element", url: "https://leetcode.com/problems/next-greater-element-i/description/" },
      { id: 21, title: "Trapping Rainwater", url: "https://leetcode.com/problems/trapping-rain-water/description/" },
    ],
  },
  {
    topic: "Graph",
    questions: [
      { id: 22, title: "Pacific Atlantic Water Flow", url: "https://leetcode.com/problems/pacific-atlantic-water-flow/" },
      { id: 23, title: "Number of islands(Do in Grid and Graph Both", url: "https://leetcode.com/problems/number-of-islands/description//" },
      { id: 24, title: "Longest Consecutive Sequence", url: "https://leetcode.com/problems/longest-consecutive-sequence/description//" },
      { id: 25, title: "Alien dictionary", url: "https://leetcode.com/problems/alien-dictionary/editorial/" },
      { id: 26, title: "Graph Valid Treey", url: "https://leetcode.com/problems/graph-valid-tree/solutions/" },
    ],
  },
  {
    topic: "binary",
    questions: [
      { id: 27, title: "Sum of Two Integers", url: "https://leetcode.com/problems/sum-of-two-integers/description/" },
      { id: 28, title: "Number of 1 Bits", url: "https://leetcode.com/problems/number-of-1-bits/" },
      { id: 29, title: "Counting Bits", url: "https://leetcode.com/problems/counting-bits/description/" },
      { id: 30, title: "Find missing number in an array", url: "https://leetcode.com/problems/missing-number/" },
      { id: 31, title: "Reverse Bits", url: "https://leetcode.com/problems/reverse-bits/description/" },
    ],
  },
  {
    topic: "String",
    questions: [
      { id: 32, title: "Longest Substring Without Repeating Characters", url: "https://leetcode.com/problems/longest-substring-without-repeating-characters/description/" },
      { id: 33, title: "longest repeating character replacement", url: "https://leetcode.com/problems/longest-repeating-character-replacement/description/" },
      { id: 34, title: "Minimum Window Substring", url: "https://leetcode.com/problems/minimum-window-substring/description/" },
      { id: 35, title: "Check for Anagrams", url: "https://leetcode.com/problems/valid-anagram/description/" },
    ]
    } ,
  {
    topic: "Dynamic Programming",
    questions: [
      { id: 36, title: "Climbing Stairs", url: "https://leetcode.com/problems/climbing-stairs/" },
      { id: 37, title: "House Robber", url: "https://leetcode.com/problems/house-robber/" },
      { id: 38, title: "Coin change", url: "https://leetcode.com/problems/coin-change/description/" },
      { id: 39, title: "Longest Increasing Subsequence", url: "https://leetcode.com/problems/longest-increasing-subsequence/description/" },
      { id: 40, title: "Longest Common Subsequence", url: "https://leetcode.com/problems/longest-common-subsequence/description/" },
      { id: 41, title: "Word Break", url: "https://leetcode.com/problems/word-break/description/" },
      { id: 42, title: "Grid Unique Paths", url: "https://leetcode.com/problems/unique-paths/" },
    ],
  },
  {
    topic: "Tree",
    questions: [
      { id: 43, title: "Height of a Binary Tree", url: "https://leetcode.com/problems/maximum-depth-of-binary-tree/description/" },
      { id: 44, title: "Check if two trees are identical or not", url: "https://leetcode.com/problems/same-tree/description/" },
      { id: 45, title: "Invert/Flip Binary Tree (Create)", url: "https://leetcode.com/problems/invert-binary-tree/description/" },
      { id: 46, title: "Maximum path sum", url: "https://leetcode.com/problems/binary-tree-maximum-path-sum/description/" },
      { id: 47, title: "Level order Traversal / Level order traversal in spiral form", url: "https://leetcode.com/problems/binary-tree-level-order-traversal/description/"}
    ],},
    {
        topic: "Heap",
        questions: [
          { id: 48, title: "K most frequent elements", url: "https://leetcode.com/problems/top-k-frequent-elements/description/" },
          { id: 49, title: "Find Median from Data Stream", url: "https://leetcode.com/problems/find-median-from-data-stream/description/" },
          { id: 50, title: "Task Scheduler", url: "https://leetcode.com/problems/task-scheduler/" },
    
        ],}
];

const LeetCodeProgress: React.FC = () => {
  const [solvedQuestions, setSolvedQuestions] = useState<number[]>([]);

  useEffect(() => {
    const savedProgress = JSON.parse(localStorage.getItem("solvedQuestions") || "[]");
    setSolvedQuestions(savedProgress);
  }, []);

  const handleSolve = (id: number) => {
    let updatedSolved;
    if (solvedQuestions.includes(id)) {
      updatedSolved = solvedQuestions.filter((qId) => qId !== id);
    } else {
      updatedSolved = [...solvedQuestions, id];
    }
    setSolvedQuestions(updatedSolved);
    localStorage.setItem("solvedQuestions", JSON.stringify(updatedSolved));
  };

  const totalQuestions = questionCategories.reduce((acc, category) => acc + category.questions.length, 0);
  const overallProgressPercentage = (solvedQuestions.length / totalQuestions) * 100;

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <h1>DSA Tracker</h1>
        <h2>  Overall Progress: {solvedQuestions.length} / {totalQuestions}</h2>

        {/* Overall Progress Bar */}
        <div style={{ width: "90%", margin: "20px auto", backgroundColor: "#e0e0e0", borderRadius: "10px", height: "10px" }}>
          <div 
            style={{ 
              width: `${overallProgressPercentage}%`, 
              height: "100%", 
              backgroundColor: "blue", 
              borderRadius: "10px", 
              transition: "width 0.5s ease-in-out"
            }} 
          /> 
        </div>

        {/* Accordions for Question Categories with Individual Progress */}
        <IonAccordionGroup>
          {questionCategories.map((category, index) => {
            const categorySolved = category.questions.filter(q => solvedQuestions.includes(q.id)).length;
            const categoryProgress = (categorySolved / category.questions.length) * 100;

            return (
              <IonAccordion key={index} value={category.topic}>
                <IonItem slot="header">
                  <IonLabel style={{margin:"25px 10px"}}> Step {index+1} : {category.topic} ({categorySolved}/{category.questions.length})</IonLabel>
                </IonItem>
                <div slot="content">
                  {/* Section-wise Progress Bar */}
                  <div style={{ width: "90%", margin: "10px auto", backgroundColor: "#e0e0e0", borderRadius: "10px", height: "8px" }}>
                    <div 
                      style={{ 
                        width: `${categoryProgress}%`, 
                        height: "100%", 
                        backgroundColor: "blue", 
                        borderRadius: "10px", 
                        transition: "width 0.5s ease-in-out"
                      }} 
                    />
                  </div>

                  <IonList>
                    {category.questions.map((q) => (
                      <IonItem key={q.id} style={{ padding: "10px" }}>
                        <IonCheckbox
                          slot="start"
                          checked={solvedQuestions.includes(q.id)}
                          onIonChange={() => handleSolve(q.id)}
                        />
                        <IonLabel>
                          <a href={q.url} target="_blank" rel="noopener noreferrer">{q.title}</a>
                        </IonLabel>
                      </IonItem>
                    ))}
                  </IonList>
                </div>
              </IonAccordion>
            );
          })}
        </IonAccordionGroup>
      </IonContent>
    </IonPage>
  );
};

export default LeetCodeProgress;
