// Firebase Integration - Ready for Firebase SDK
// This file provides mock functions and interfaces for Firebase integration

export interface FirebaseUser {
  uid: string;
  email: string;
  displayName: string;
}

export interface LeaderboardEntry {
  uid: string;
  displayName: string;
  score: number;
  captures: number;
  accuracy: number;
  avgTime: string;
  timestamp: number;
}

// Mock Firebase functions - replace with actual Firebase SDK calls
export const mockFirebase = {
  // Authentication
  signIn: async (email: string, password: string): Promise<FirebaseUser> => {
    // Mock sign in - replace with firebase.auth().signInWithEmailAndPassword()
    return {
      uid: 'mock-uid',
      email,
      displayName: 'Mock User',
    };
  },

  signOut: async (): Promise<void> => {
    // Mock sign out - replace with firebase.auth().signOut()
    console.log('User signed out');
  },

  // Leaderboard
  submitScore: async (score: number, captures: number, accuracy: number, avgTime: string): Promise<void> => {
    // Mock score submission - replace with Firestore write
    console.log('Score submitted:', { score, captures, accuracy, avgTime });
  },

  getLeaderboard: async (): Promise<LeaderboardEntry[]> => {
    // Mock leaderboard fetch - replace with Firestore query
    return [
      {
        uid: '1',
        displayName: 'Commander Steel',
        score: 15750,
        captures: 42,
        accuracy: 94,
        avgTime: '02:15',
        timestamp: Date.now(),
      },
      // ... more mock entries
    ];
  },
};

// Firebase configuration placeholder
export const firebaseConfig = {
  // Add your Firebase config here
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-app-id"
};

// TODO: Initialize Firebase
// import { initializeApp } from 'firebase/app';
// import { getAuth } from 'firebase/auth';
// import { getFirestore } from 'firebase/firestore';

// const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app);
// export const db = getFirestore(app);