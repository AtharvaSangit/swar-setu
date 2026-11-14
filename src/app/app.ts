
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  signal
} from '@angular/core';

import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule,
  FormControl
} from '@angular/forms';

interface Post {
  id: number;
  author: string;
  role: string;
  avatar: string;
  time: string;
  content: string;
  likes: number;
  commentsCount: number;
  liked: boolean;
  comments: string[];
}

interface Artist {
  id: number;
  name: string;
  discipline: string;
  gharana: string;
  location: string;
  bio: string;
  image: string;
  rating: number;
}

interface EventItem {
  id: number;
  title: string;
  artist: string;
  date: string;
  location: string;
  type: string;
  price: string;
}

interface RagaItem {
  name: string;
  time: string;
  thaat: string;
  mood: string;
  description: string;
}

interface PracticeLog {
  id: number;
  raga: string;
  durationMinutes: number;
  notes: string;
  date: string;
}

interface TaalBeat {
  matra: number;
  bol: string;
  type: string;
}

/* NEW: Song Explorer Interface */
interface SongItem {
  id: number;
  title: string;
  artist: string;
  form: string;
  raga: string;
  taal: string;
  laya: string;
  mood: string;
  description: string;
  lyrics: string;
  composer: string;
  duration: string;
  tags: string[];
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  template: `
    <div
      class="min-h-screen bg-[#FDFBF7] text-[#1E293B]
             font-sans flex flex-col
             selection:bg-amber-100">

      <!-- ========================================================= -->
      <!-- HEADER -->
      <!-- ========================================================= -->

      <header
        class="bg-white/90 backdrop-blur-md
               border-b border-stone-200
               sticky top-0 z-50">

        <div
          class="max-w-7xl mx-auto px-6 h-20
                 flex items-center justify-between">

          <!-- Logo -->

          <div
            class="flex items-center space-x-3 cursor-pointer"
            (click)="activeTab.set('feed')">

            <div
              class="w-10 h-10 rounded-full
                     bg-amber-700 text-white
                     flex items-center justify-center
                     font-bold text-lg shadow-sm">

              ॐ

            </div>

            <div>

              <h1
                class="text-xl font-bold tracking-tight text-stone-900">

                SWARA-SETU

              </h1>

              <p
                class="text-xs text-amber-800
                       tracking-wider font-medium">

                Global Classical Music Ecosystem

              </p>

            </div>

          </div>


          <!-- Desktop Navigation -->

          <nav class="hidden md:flex space-x-1">

            @for (tab of tabs; track tab.id) {

              <button
                class="px-4 py-2 rounded-full
                       text-sm font-medium
                       transition-all duration-200"

                [class.bg-amber-50]="activeTab() === tab.id"
                [class.text-amber-900]="activeTab() === tab.id"
                [class.text-stone-600]="activeTab() !== tab.id"
                [class.hover:bg-stone-100]="activeTab() !== tab.id"

                (click)="activeTab.set(tab.id)">

                <i
                  [class]="tab.icon + ' mr-2'">
                </i>

                {{ tab.label }}

              </button>

            }

          </nav>


          <div class="flex items-center space-x-2">

            <span class="hidden sm:inline-flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-full bg-amber-100 text-amber-900">
              ⭐ <span>Score:</span> {{ quizScore() }}
            </span>

            <span class="hidden sm:inline-flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-full bg-orange-50 text-orange-800">
              🔥 <span>{{ learningStreak }}</span> day streak
            </span>

            <span
              class="hidden lg:inline-block
                     text-xs font-semibold
                     px-3 py-1 rounded-full
                     bg-stone-100 text-stone-600">
              Prototype v1.2
            </span>

          </div>

        </div>

      </header>


      <!-- ========================================================= -->
      <!-- MOBILE NAVIGATION -->
      <!-- ========================================================= -->

      <div
        class="flex md:hidden bg-white
               border-b border-stone-200
               overflow-x-auto px-4 py-2 space-x-2">

        @for (tab of tabs; track tab.id) {

          <button
            class="px-3 py-1.5 rounded-full
                   text-xs font-medium
                   whitespace-nowrap"

            [class.bg-amber-700]="activeTab() === tab.id"
            [class.text-white]="activeTab() === tab.id"
            [class.bg-stone-100]="activeTab() !== tab.id"
            [class.text-stone-700]="activeTab() !== tab.id"

            (click)="activeTab.set(tab.id)">

            {{ tab.label }}

          </button>

        }

      </div>


      <!-- ========================================================= -->
      <!-- MAIN -->
      <!-- ========================================================= -->

      <main
        class="flex-grow max-w-7xl w-full
               mx-auto px-6 py-8">


        <!-- ======================================================= -->
        <!-- FEED -->
        <!-- ======================================================= -->

        @if (activeTab() === 'feed') {

          <div
            class="grid grid-cols-1
                   lg:grid-cols-3 gap-8">


            <!-- LEFT SIDEBAR -->

            <div class="space-y-6">

              <div
                class="bg-white rounded-2xl p-6
                       border border-stone-200 shadow-sm">

                <div
                  class="flex items-center
                         space-x-4 mb-4">

                  <div
                    class="w-14 h-14 rounded-full
                           bg-stone-200
                           flex items-center
                           justify-center
                           text-xl font-bold
                           text-stone-700">

                    AK

                  </div>

                  <div>

                    <h3
                      class="font-bold text-stone-900">

                      Aarav Kulkarni

                    </h3>

                    <p
                      class="text-xs text-stone-500">

                      Sitar Student • Pune Gharana

                    </p>

                  </div>

                </div>


                <hr class="border-stone-100 my-4">


                <div
                  class="space-y-2
                         text-sm text-stone-600">

                  <div class="flex justify-between">

                    <span>Following Gurus</span>

                    <span
                      class="font-semibold text-stone-900">

                      12

                    </span>

                  </div>

                  <div class="flex justify-between">

                    <span>Saved Events</span>

                    <span
                      class="font-semibold text-stone-900">

                      4

                    </span>

                  </div>

                  <div class="flex justify-between">

                    <span>Sadhana Logged</span>

                    <span
                      class="font-semibold text-amber-800">

                      {{ practiceLogs().length }} Sessions

                    </span>

                  </div>

                  <div class="flex justify-between">

                    <span>Community Rank</span>

                    <span
                      class="font-semibold text-amber-800">

                      Sadhaka

                    </span>

                  </div>

                </div>

              </div>


              <div
                class="bg-gradient-to-br
                       from-amber-900 to-stone-900
                       text-amber-50 rounded-2xl
                       p-6 shadow-sm">

                <h4
                  class="font-semibold text-amber-200 mb-2">

                  💡 Daily Raga Insight

                </h4>

                <p
                  class="text-sm italic text-stone-200
                         leading-relaxed mb-4">

                  "Raga Yaman is performed during
                  the first quarter of the night.
                  It evokes Bhakti and Shanta rasa,
                  known for its calming serenity."

                </p>

                <button
                  (click)="activeTab.set('discover')"
                  class="text-xs bg-amber-500/20
                         hover:bg-amber-500/30
                         text-amber-200
                         px-3 py-1.5 rounded-lg
                         font-medium transition">

                  Explore Yaman Details &rarr;

                </button>

              </div>

            </div>


            <!-- FEED -->

            <div
              class="lg:col-span-2
                     space-y-6">


              <!-- CREATE POST -->

              <div
                class="bg-white rounded-2xl p-5
                       border border-stone-200
                       shadow-sm">

                <div
                  class="flex items-center
                         space-x-3 mb-3">

                  <div
                    class="w-10 h-10 rounded-full
                           bg-stone-200
                           flex items-center
                           justify-center
                           font-bold text-stone-700
                           text-sm">

                    AK

                  </div>

                  <input
                    type="text"
                    [formControl]="newPostContent"
                    placeholder="Share an update, raga thought, or performance announcement..."
                    class="flex-grow bg-stone-50
                           border border-stone-200
                           rounded-full px-4 py-2.5
                           text-sm focus:outline-none
                           focus:border-amber-700"

                    (keyup.enter)="createPost()">

                </div>


                <div
                  class="flex justify-between
                         items-center pt-2 px-1">

                  <div
                    class="flex space-x-3
                           text-stone-500 text-xs">

                    <button
                      class="hover:text-amber-800
                             flex items-center">

                      <i
                        class="fa-solid fa-image mr-1.5">
                      </i>

                      Media

                    </button>

                    <button
                      class="hover:text-amber-800
                             flex items-center">

                      <i
                        class="fa-solid fa-calendar-days mr-1.5">
                      </i>

                      Event

                    </button>

                    <button
                      class="hover:text-amber-800
                             flex items-center">

                      <i
                        class="fa-solid fa-music mr-1.5">
                      </i>

                      Audio

                    </button>

                  </div>


                  <button
                    (click)="createPost()"
                    class="bg-amber-800
                           hover:bg-amber-900
                           text-white text-xs
                           font-semibold px-4 py-2
                           rounded-full transition">

                    Publish

                  </button>

                </div>

              </div>


              <!-- POSTS -->

              @for (post of posts(); track post.id) {

                <div
                  class="bg-white rounded-2xl p-6
                         border border-stone-200
                         shadow-sm space-y-4">

                  <div
                    class="flex items-center
                           justify-between">

                    <div
                      class="flex items-center
                             space-x-3">

                      <div
                        class="w-10 h-10 rounded-full
                               bg-amber-100
                               text-amber-900
                               font-bold
                               flex items-center
                               justify-center
                               text-sm">

                        {{ post.avatar }}

                      </div>

                      <div>

                        <h4
                          class="font-bold text-stone-900
                                 text-sm">

                          {{ post.author }}

                        </h4>

                        <p
                          class="text-xs text-stone-500">

                          {{ post.role }} • {{ post.time }}

                        </p>

                      </div>

                    </div>

                    <span
                      class="text-xs text-stone-400">

                      <i
                        class="fa-solid fa-ellipsis">
                      </i>

                    </span>

                  </div>


                  <p
                    class="text-stone-800
                           text-sm leading-relaxed">

                    {{ post.content }}

                  </p>


                  <div
                    class="flex items-center
                           space-x-6 pt-2
                           border-t border-stone-100
                           text-stone-600 text-xs">

                    <button
                      (click)="toggleLike(post.id)"
                      class="flex items-center
                             space-x-1.5
                             hover:text-amber-800
                             transition"

                      [class.text-amber-700]="post.liked">

                      <i
                        class="fa-solid fa-heart">
                      </i>

                      <span>
                        {{ post.likes }} Likes
                      </span>

                    </button>


                    <button
                      class="flex items-center
                             space-x-1.5
                             hover:text-amber-800">

                      <i
                        class="fa-regular fa-comment">
                      </i>

                      <span>
                        {{ post.comments.length }}
                        Comments
                      </span>

                    </button>


                    <button
                      class="flex items-center
                             space-x-1.5
                             hover:text-amber-800">

                      <i
                        class="fa-solid fa-share">
                      </i>

                      <span>Share</span>

                    </button>

                  </div>


                  @if (post.comments.length > 0) {

                    <div
                      class="bg-stone-50 rounded-xl
                             p-3 space-y-2 mt-3">

                      @for (
                        comment of post.comments;
                        track $index
                      ) {

                        <p
                          class="text-xs text-stone-700
                                 bg-white p-2 rounded
                                 border border-stone-100">

                          {{ comment }}

                        </p>

                      }

                    </div>

                  }

                </div>

              }

            </div>

          </div>

        }


        <!-- ======================================================= -->
        <!-- SADHANA -->
        <!-- ======================================================= -->

        @if (activeTab() === 'sadhana') {

          <div class="space-y-6">

            <div>

              <h2
                class="text-2xl font-bold
                       text-stone-900">

                Sadhana Practice Room & Tanpura Drone

              </h2>

              <p
                class="text-stone-600 text-sm">

                Simulate your daily riyaz drone,
                keep track of practice hours,
                and log your notes.

              </p>

            </div>


            <div
              class="grid grid-cols-1
                     lg:grid-cols-3 gap-6">


              <!-- TANPURA -->

              <div
                class="bg-gradient-to-br
                       from-stone-900 to-amber-950
                       text-amber-50 rounded-2xl
                       p-6 shadow-md
                       flex flex-col
                       justify-between">

                <div>

                  <div
                    class="flex justify-between
                           items-center mb-6">

                    <span
                      class="text-xs
                             bg-amber-500/20
                             text-amber-200
                             px-3 py-1
                             rounded-full
                             font-semibold">

                      Virtual Shruti Box

                    </span>

                    <span
                      class="w-3 h-3 rounded-full"
                      [class.bg-emerald-500]="isTanpuraPlaying()"
                      [class.bg-stone-500]="!isTanpuraPlaying()">
                    </span>

                  </div>


                  <div
                    class="text-center my-8">

                    <div
                      class="text-xs text-amber-300
                             uppercase tracking-widest
                             font-semibold mb-1">

                      Current Root Note (Paas)

                    </div>

                    <div
                      class="text-5xl font-extrabold
                             text-white tracking-wider mb-2">

                      {{ selectedRootNote }}

                    </div>

                    <div
                      class="text-xs text-stone-300">

                      Combination:
                      {{ selectedTanpuraStyle }}

                    </div>

                  </div>

                </div>


                <div class="space-y-4">

                  <div
                    class="flex justify-center
                           space-x-2">

                    @for (
                      note of rootNotes;
                      track note
                    ) {

                      <button
                        (click)="selectedRootNote = note"
                        class="px-3 py-1 rounded
                               text-xs font-medium"

                        [class.bg-amber-700]="selectedRootNote === note"
                        [class.bg-stone-800]="selectedRootNote !== note">

                        {{ note.split(' ')[0] }}

                      </button>

                    }

                  </div>


                  <button
                    (click)="toggleTanpura()"
                    class="w-full py-3 rounded-xl
                           font-semibold text-sm
                           transition shadow"

                    [class.bg-emerald-700]="isTanpuraPlaying()"
                    [class.hover:bg-emerald-800]="isTanpuraPlaying()"
                    [class.bg-amber-600]="!isTanpuraPlaying()"
                    [class.hover:bg-amber-700]="!isTanpuraPlaying()">

                    <i
                      class="fa-solid"
                      [class.fa-stop]="isTanpuraPlaying()"
                      [class.fa-play]="!isTanpuraPlaying()">
                    </i>

                    {{ isTanpuraPlaying()
                      ? 'Stop Tanpura Drone'
                      : 'Start Tanpura Riyaz'
                    }}

                  </button>

                </div>

              </div>


              <!-- PRACTICE LOG -->

              <div
                class="lg:col-span-2
                       bg-white rounded-2xl p-6
                       border border-stone-200
                       shadow-sm
                       flex flex-col
                       justify-between">

                <div>

                  <h3
                    class="font-bold text-stone-900
                           text-lg mb-4 flex items-center">

                    <i
                      class="fa-solid fa-pen-nib
                             text-amber-800 mr-2">
                    </i>

                    Log Your Riyaz Session

                  </h3>


                  <div
                    class="grid grid-cols-1
                           md:grid-cols-2
                           gap-4 mb-4">

                    <div>

                      <label
                        class="block text-xs
                               font-semibold
                               text-stone-600 mb-1">

                        Raga Practiced

                      </label>

                      <input
                        type="text"
                        [formControl]="practiceRagaCtrl"
                        placeholder="e.g., Raga Yaman / Alankars"
                        class="w-full bg-stone-50
                               border border-stone-200
                               rounded-xl px-4 py-2.5
                               text-sm focus:outline-none
                               focus:border-amber-700">

                    </div>


                    <div>

                      <label
                        class="block text-xs
                               font-semibold
                               text-stone-600 mb-1">

                        Duration (Minutes)

                      </label>

                      <input
                        type="number"
                        [formControl]="practiceDurationCtrl"
                        placeholder="45"
                        class="w-full bg-stone-50
                               border border-stone-200
                               rounded-xl px-4 py-2.5
                               text-sm focus:outline-none
                               focus:border-amber-700">

                    </div>

                  </div>


                  <div class="mb-4">

                    <label
                      class="block text-xs
                             font-semibold
                             text-stone-600 mb-1">

                      Practice Notes & Focus Areas

                    </label>

                    <textarea
                      [formControl]="practiceNotesCtrl"
                      rows="2"
                      placeholder="Focus on slow vilambit khayal taans..."
                      class="w-full bg-stone-50
                             border border-stone-200
                             rounded-xl px-4 py-2
                             text-sm focus:outline-none
                             focus:border-amber-700">
                    </textarea>

                  </div>

                </div>


                <div class="flex justify-end">

                  <button
                    (click)="logPracticeSession()"
                    class="bg-amber-800
                           hover:bg-amber-900
                           text-white text-xs
                           font-semibold px-6 py-2.5
                           rounded-full transition">

                    Save Practice Log

                  </button>

                </div>

              </div>

            </div>


            <!-- SWARA + TAAL -->

            <div
              class="bg-white rounded-2xl p-6
                     border border-stone-200
                     shadow-sm">

              <div
                class="flex flex-col md:flex-row
                       justify-between md:items-center
                       gap-3 mb-5">

                <div>

                  <h3
                    class="font-bold text-stone-900
                           text-lg flex items-center">

                    <i
                      class="fa-solid fa-music
                             text-amber-800 mr-2">
                    </i>

                    Swara & Taal Practice Studio

                  </h3>

                  <p
                    class="text-xs text-stone-500 mt-1">

                    Practice individual swaras
                    alongside a live taal cycle.

                  </p>

                </div>


                <div class="flex items-center gap-2">

                  <label
                    class="text-xs font-semibold
                           text-stone-600">

                    Taal

                  </label>

                  <select
                    [(ngModel)]="selectedPracticeTaal"
                    (change)="selectPracticeTaal()"
                    class="bg-stone-50
                           border border-stone-200
                           rounded-lg px-3 py-2
                           text-xs">

                    @for (
                      taal of availableTaals;
                      track taal
                    ) {

                      <option [value]="taal">
                        {{ taal }}
                      </option>

                    }

                  </select>

                </div>

              </div>


              <!-- SWARAS -->

              <div class="mb-5">

                <div
                  class="flex justify-between
                         items-center mb-2">

                  <span
                    class="text-xs font-semibold
                           uppercase tracking-wide
                           text-stone-500">

                    Swara Keypad

                  </span>

                  <span
                    class="text-[11px]
                           text-stone-400">

                    Click a key to hear the note

                  </span>

                </div>


                <div
                  class="grid grid-cols-4
                         sm:grid-cols-6
                         md:grid-cols-12 gap-1.5">

                  @for (
                    swara of practiceSwaras;
                    track swara.name
                  ) {

                    <button
                      type="button"
                      (click)="playSwaraNote(swara.name)"
                      class="h-16 rounded-xl
                             border text-xs
                             font-bold
                             transition-all
                             active:scale-95"

                      [class.bg-amber-800]="activeSwara === swara.name"
                      [class.text-white]="activeSwara === swara.name"
                      [class.border-amber-800]="activeSwara === swara.name"
                      [class.bg-stone-50]="activeSwara !== swara.name"
                      [class.text-stone-800]="activeSwara !== swara.name"
                      [class.border-stone-200]="activeSwara !== swara.name">

                      <span
                        class="block text-base">

                        {{ swara.name }}

                      </span>

                      <span
                        class="block text-[9px]
                               text-stone-400 mt-1">

                        {{ swara.type }}

                      </span>

                    </button>

                  }

                </div>

              </div>


              <!-- TAAL -->

              <div
                class="border-t border-stone-100
                       pt-5">

                <div
                  class="flex flex-col
                         md:flex-row
                         md:items-center
                         justify-between
                         gap-3 mb-4">

                  <div
                    class="flex items-center gap-3">

                    <span
                      class="text-xs font-semibold
                             uppercase
                             tracking-wide
                             text-stone-500">

                      {{ selectedPracticeTaal }}
                      Rhythm

                    </span>

                    <span
                      class="text-xs bg-amber-100
                             text-amber-900
                             px-2.5 py-1
                             rounded-full
                             font-semibold">

                      {{ practiceBpm }} BPM

                    </span>

                  </div>


                  <div
                    class="flex items-center gap-3">

                    <label
                      class="text-xs text-stone-500">

                      Tempo

                    </label>

                    <input
                      type="range"
                      min="40"
                      max="180"
                      step="1"
                      [(ngModel)]="practiceBpm"
                      (change)="restartTaalTempo()"
                      class="w-32 accent-amber-700">

                    <button
                      type="button"
                      (click)="toggleTaalPractice()"
                      class="px-4 py-2
                             rounded-full
                             text-xs font-semibold
                             text-white"

                      [class.bg-emerald-700]="isTaalPracticePlaying()"
                      [class.bg-amber-800]="!isTaalPracticePlaying()">

                      <i
                        class="fa-solid mr-1.5"
                        [class.fa-stop]="isTaalPracticePlaying()"
                        [class.fa-play]="!isTaalPracticePlaying()">
                      </i>

                      {{ isTaalPracticePlaying()
                        ? 'Stop Taal'
                        : 'Start Taal'
                      }}

                    </button>

                  </div>

                </div>


                <div
                  class="flex gap-2
                         overflow-x-auto pb-2">

                  @for (
                    beat of practiceTaalBeats;
                    track beat.matra
                  ) {

                    <button
                      type="button"
                      (click)="playTaalBeat(beat.matra - 1)"
                      class="min-w-[64px] h-20
                             rounded-xl border
                             flex flex-col
                             items-center
                             justify-between p-2
                             transition-all"

                      [class.bg-amber-800]="activeTaalBeat === beat.matra - 1"
                      [class.text-white]="activeTaalBeat === beat.matra - 1"
                      [class.border-amber-800]="activeTaalBeat === beat.matra - 1"
                      [class.bg-stone-50]="activeTaalBeat !== beat.matra - 1"
                      [class.border-stone-200]="activeTaalBeat !== beat.matra - 1">

                      <span
                        class="text-[10px]">

                        {{ beat.matra }}

                      </span>

                      <span
                        class="text-sm font-bold">

                        {{ beat.bol }}

                      </span>

                      <span
                        class="text-[9px]
                               font-semibold
                               px-1.5 py-0.5
                               rounded">

                        {{ beat.type }}

                      </span>

                    </button>

                  }

                </div>

              </div>

            </div>


            <!-- PRACTICE HISTORY -->

            <div
              class="bg-white rounded-2xl p-6
                     border border-stone-200
                     shadow-sm">

              <h3
                class="font-bold text-stone-900
                       text-base mb-4">

                Your Recent Sadhana History

              </h3>


              <div class="space-y-3">

                @for (
                  log of practiceLogs();
                  track log.id
                ) {

                  <div
                    class="flex flex-col md:flex-row
                           justify-between
                           items-start md:items-center
                           p-4 bg-stone-50
                           rounded-xl
                           border border-stone-100
                           gap-2">

                    <div>

                      <div
                        class="flex items-center
                               space-x-2">

                        <span
                          class="font-bold
                                 text-stone-900
                                 text-sm">

                          {{ log.raga }}

                        </span>

                        <span
                          class="text-xs
                                 bg-amber-100
                                 text-amber-900
                                 px-2.5 py-0.5
                                 rounded-full
                                 font-semibold">

                          {{ log.durationMinutes }}
                          mins

                        </span>

                      </div>

                      <p
                        class="text-xs
                               text-stone-600 mt-1">

                        {{ log.notes }}

                      </p>

                    </div>

                    <span
                      class="text-xs
                             text-stone-400
                             font-medium">

                      {{ log.date }}

                    </span>

                  </div>

                }

              </div>

            </div>

          </div>

        }


        <!-- ======================================================= -->
        <!-- ARTISTS -->
        <!-- ======================================================= -->

        @if (activeTab() === 'artists') {

          <div class="space-y-6">

            <div
              class="flex flex-col md:flex-row
                     justify-between
                     items-start md:items-center
                     gap-4">

              <div>

                <h2
                  class="text-2xl font-bold
                         text-stone-900">

                  Gurus, Teachers & Artists Directory

                </h2>

                <p
                  class="text-stone-600 text-sm">

                  Discover masters, vocalists,
                  instrumentalists, and institutions.

                </p>

              </div>


              <input
                type="text"
                [formControl]="artistSearch"
                placeholder="Search artist or instrument..."
                class="bg-white border
                       border-stone-200
                       rounded-lg px-4 py-2
                       text-sm w-full
                       md:w-64">

            </div>


            <div
              class="grid grid-cols-1
                     md:grid-cols-2
                     lg:grid-cols-3 gap-6">

              @for (
                artist of filteredArtists();
                track artist.id
              ) {

                <div
                  class="bg-white rounded-2xl
                         border border-stone-200
                         p-6 shadow-sm
                         flex flex-col
                         justify-between
                         hover:border-amber-300">

                  <div>

                    <div
                      class="flex items-start
                             justify-between mb-4">

                      <div
                        class="w-16 h-16 rounded-2xl
                               bg-amber-100
                               text-amber-900
                               font-bold
                               flex items-center
                               justify-center
                               text-xl">

                        {{ artist.image }}

                      </div>

                      <span
                        class="text-xs
                               bg-stone-100
                               text-stone-700
                               px-2.5 py-1
                               rounded-full">

                        ★ {{ artist.rating }}

                      </span>

                    </div>


                    <h3
                      class="font-bold
                             text-stone-900
                             text-lg">

                      {{ artist.name }}

                    </h3>

                    <p
                      class="text-xs
                             text-amber-800
                             font-semibold mb-2">

                      {{ artist.discipline }}

                    </p>

                    <p
                      class="text-xs
                             text-stone-500 mb-3">

                      <i
                        class="fa-solid
                               fa-location-dot mr-1">
                      </i>

                      {{ artist.location }}
                      • {{ artist.gharana }}

                    </p>

                    <p
                      class="text-sm
                             text-stone-600
                             leading-relaxed mb-4">

                      {{ artist.bio }}

                    </p>

                  </div>


                  <div
                    class="pt-4
                           border-t
                           border-stone-100
                           flex justify-between
                           items-center">

                    <span
                      class="text-xs
                             text-stone-500
                             font-medium">

                      Verified Guru

                    </span>

                    <button
                      (click)="connectArtist(artist.name)"
                      class="bg-stone-900
                             hover:bg-amber-800
                             text-white
                             text-xs
                             font-semibold
                             px-4 py-2
                             rounded-full">

                      Connect / Enquire

                    </button>

                  </div>

                </div>

              }

            </div>

          </div>

        }


        <!-- ======================================================= -->
        <!-- EVENTS -->
        <!-- ======================================================= -->

        @if (activeTab() === 'events') {

          <div class="space-y-6">

            <div>

              <h2
                class="text-2xl font-bold
                       text-stone-900">

                Global Concerts, Festivals & Masterclasses

              </h2>

              <p
                class="text-stone-600 text-sm">

                Explore upcoming Indian classical
                music programs worldwide.

              </p>

            </div>


            <div
              class="grid grid-cols-1
                     md:grid-cols-2 gap-6">

              @for (
                event of eventsList;
                track event.id
              ) {

                <div
                  class="bg-white rounded-2xl
                         border border-stone-200
                         p-6 shadow-sm
                         flex flex-col
                         justify-between">

                  <div>

                    <div
                      class="flex justify-between
                             items-start mb-3">

                      <span
                        class="text-xs bg-amber-100
                               text-amber-900
                               font-semibold
                               px-3 py-1
                               rounded-full">

                        {{ event.type }}

                      </span>

                      <span
                        class="text-xs font-bold
                               text-stone-600">

                        {{ event.price }}

                      </span>

                    </div>


                    <h3
                      class="font-bold
                             text-stone-900
                             text-xl mb-1">

                      {{ event.title }}

                    </h3>

                    <p
                      class="text-xs
                             text-stone-500 mb-4
                             font-medium">

                      Featuring:
                      {{ event.artist }}

                    </p>


                    <div
                      class="space-y-1.5
                             text-xs
                             text-stone-600 mb-4">

                      <p>

                        <i
                          class="fa-solid
                                 fa-calendar
                                 mr-2
                                 text-amber-800">
                        </i>

                        {{ event.date }}

                      </p>

                      <p>

                        <i
                          class="fa-solid
                                 fa-location-dot
                                 mr-2
                                 text-amber-800">
                        </i>

                        {{ event.location }}

                      </p>

                    </div>

                  </div>


                  <div
                    class="pt-4
                           border-t
                           border-stone-100
                           flex justify-between
                           items-center">

                    <span
                      class="text-xs
                             text-stone-500">

                      Global Online Stream Available

                    </span>

                    <button
                      (click)="bookEvent(event.title)"
                      class="bg-amber-800
                             hover:bg-amber-900
                             text-white text-xs
                             font-semibold
                             px-4 py-2
                             rounded-full">

                      Book Ticket / RSVP

                    </button>

                  </div>

                </div>

              }

            </div>

          </div>

        }


        <!-- ======================================================= -->
        <!-- DISCOVER -->
        <!-- ======================================================= -->

        @if (activeTab() === 'discover') {

          <div class="space-y-6">


            <!-- RAGA HEADER -->

            <div>

              <h2
                class="text-2xl font-bold
                       text-stone-900">

                Discover Ragas, Talas & Traditions

              </h2>

              <p
                class="text-stone-600 text-sm">

                Explore classical music theory,
                gharana roots, compositions and songs.

              </p>

            </div>


            <!-- RAGA CARDS -->

            <div
              class="grid grid-cols-1
                     md:grid-cols-3 gap-6">

              @for (
                raga of ragas;
                track raga.name
              ) {

                <div
                  class="bg-white rounded-2xl
                         border border-stone-200
                         p-6 shadow-sm
                         flex flex-col
                         justify-between">

                  <div>

                    <div
                      class="flex justify-between
                             items-center mb-3">

                      <h3
                        class="font-bold
                               text-stone-900
                               text-lg">

                        {{ raga.name }}

                      </h3>

                      <span
                        class="text-xs
                               bg-stone-100
                               text-stone-700
                               px-2.5 py-1
                               rounded-full">

                        {{ raga.thaat }} Thaat

                      </span>

                    </div>


                    <p
                      class="text-xs
                             text-amber-800
                             font-medium mb-3">

                      Time: {{ raga.time }}
                      • Mood: {{ raga.mood }}

                    </p>


                    <p
                      class="text-sm
                             text-stone-600
                             leading-relaxed mb-4">

                      {{ raga.description }}

                    </p>

                  </div>


                  <button
                    (click)="exploreRaga(raga.name)"
                    class="w-full bg-stone-100
                           hover:bg-amber-50
                           text-stone-800
                           hover:text-amber-900
                           text-xs
                           font-semibold
                           py-2.5 rounded-xl">

                    Listen to Sample
                    & Bandish &rarr;

                  </button>

                </div>

              }

            </div>


            <!-- ================================================= -->
            <!-- SONG EXPLORER -->
            <!-- ================================================= -->

            <div
              class="bg-white rounded-2xl
                     border border-stone-200
                     shadow-sm p-6 mt-8">


              <!-- SONG EXPLORER HEADER -->

              <div
                class="flex flex-col
                       lg:flex-row
                       lg:items-center
                       justify-between
                       gap-4 mb-6">

                <div>

                  <h3
                    class="text-xl font-bold
                           text-stone-900
                           flex items-center">

                    <i
                      class="fa-solid
                             fa-compact-disc
                             text-amber-800 mr-2">
                    </i>

                    Song Explorer

                  </h3>

                  <p
                    class="text-sm
                           text-stone-500 mt-1">

                    Discover the Raga, Taal,
                    lyrics and musical character
                    behind a composition.

                  </p>

                </div>


                <!-- SEARCH -->

                <div
                  class="relative
                         w-full lg:w-80">

                  <i
                    class="fa-solid
                           fa-magnifying-glass
                           absolute left-3 top-3
                           text-stone-400
                           text-xs">
                  </i>

                  <input
                    type="text"
                    [formControl]="songSearch"
                    placeholder="Search song, raga, taal..."
                    class="w-full bg-stone-50
                           border border-stone-200
                           rounded-xl pl-9 pr-4
                           py-2.5 text-sm
                           focus:outline-none
                           focus:border-amber-700">

                </div>

              </div>


              <!-- SONG CARDS -->

              <div
                class="grid grid-cols-1
                       md:grid-cols-2
                       lg:grid-cols-3 gap-4">

                @for (
                  song of filteredSongs();
                  track song.id
                ) {

                  <div
                    class="group bg-stone-50
                           border border-stone-200
                           rounded-2xl p-5
                           hover:border-amber-300
                           hover:shadow-sm
                           transition">


                    <div
                      class="flex justify-between
                             items-start mb-4">

                      <div
                        class="w-12 h-12
                               rounded-xl
                               bg-amber-100
                               text-amber-900
                               flex items-center
                               justify-center">

                        <i
                          class="fa-solid fa-music">
                        </i>

                      </div>


                      <span
                        class="text-[10px]
                               font-bold
                               bg-white
                               border border-stone-200
                               text-stone-600
                               px-2.5 py-1
                               rounded-full">

                        {{ song.form }}

                      </span>

                    </div>


                    <h4
                      class="font-bold
                             text-stone-900 mb-1">

                      {{ song.title }}

                    </h4>


                    <p
                      class="text-xs
                             text-stone-500 mb-4">

                      {{ song.artist }}

                    </p>


                    <div
                      class="grid grid-cols-2
                             gap-2 mb-4">


                      <div
                        class="bg-white
                               rounded-lg p-2.5
                               border
                               border-stone-100">

                        <p
                          class="text-[9px]
                                 uppercase
                                 tracking-wide
                                 text-stone-400">

                          Raga

                        </p>

                        <p
                          class="text-xs font-bold
                                 text-amber-900
                                 mt-0.5">

                          {{ song.raga }}

                        </p>

                      </div>


                      <div
                        class="bg-white
                               rounded-lg p-2.5
                               border
                               border-stone-100">

                        <p
                          class="text-[9px]
                                 uppercase
                                 tracking-wide
                                 text-stone-400">

                          Taal

                        </p>

                        <p
                          class="text-xs font-bold
                                 text-stone-800
                                 mt-0.5">

                          {{ song.taal }}

                        </p>

                      </div>

                    </div>


                    <!-- TAGS -->

                    <div
                      class="flex flex-wrap
                             gap-1.5 mb-4">

                      @for (
                        tag of song.tags.slice(0, 3);
                        track tag
                      ) {

                        <span
                          class="text-[9px]
                                 bg-amber-50
                                 text-amber-800
                                 px-2 py-1
                                 rounded-full
                                 font-medium">

                          #{{ tag }}

                        </span>

                      }

                    </div>


                    <!-- ACTIONS -->

                    <div
                      class="flex gap-2">

                      <button
                        type="button"
                        (click)="selectSong(song)"
                        class="flex-1
                               bg-stone-900
                               hover:bg-amber-800
                               text-white
                               text-xs
                               font-semibold
                               py-2.5
                               rounded-xl
                               transition">

                        <i
                          class="fa-solid
                                 fa-circle-info mr-1">
                        </i>

                        Explore

                      </button>


                      <button
                        type="button"
                        (click)="playSongSample(song)"
                        class="w-10
                               bg-amber-100
                               hover:bg-amber-200
                               text-amber-900
                               rounded-xl">

                        <i
                          class="fa-solid
                                 fa-play text-xs">
                        </i>

                      </button>

                    </div>

                  </div>

                }

              </div>


              <!-- NO RESULTS -->

              @if (filteredSongs().length === 0) {

                <div
                  class="text-center py-10
                         text-stone-500">

                  <i
                    class="fa-solid fa-music
                           text-2xl mb-3">
                  </i>

                  <p class="text-sm">

                    No songs found matching
                    your search.

                  </p>

                </div>

              }

            </div>


            <!-- ================================================= -->
            <!-- SONG DETAILS -->
            <!-- ================================================= -->

            @if (selectedSong) {

              <div
                id="song-detail"
                class="bg-white
                       rounded-2xl
                       border border-stone-200
                       shadow-sm p-6 mt-6">


                <!-- SONG HEADER -->

                <div
                  class="flex flex-col
                         md:flex-row
                         justify-between
                         gap-4 mb-6">

                  <div
                    class="flex items-start
                           gap-4">

                    <div
                      class="w-16 h-16
                             rounded-2xl
                             bg-gradient-to-br
                             from-amber-700
                             to-amber-950
                             text-white
                             flex items-center
                             justify-center
                             text-xl">

                      <i
                        class="fa-solid
                               fa-music">
                      </i>

                    </div>


                    <div>

                      <div
                        class="flex flex-wrap
                               items-center gap-2">

                        <h3
                          class="text-2xl
                                 font-bold
                                 text-stone-900">

                          {{ selectedSong.title }}

                        </h3>


                        <span
                          class="text-[10px]
                                 bg-amber-100
                                 text-amber-900
                                 px-2.5 py-1
                                 rounded-full
                                 font-semibold">

                          {{ selectedSong.form }}

                        </span>

                      </div>


                      <p
                        class="text-sm
                               text-stone-500 mt-1">

                        {{ selectedSong.artist }}

                      </p>


                      <p
                        class="text-xs
                               text-stone-400 mt-1">

                        Composer:
                        {{ selectedSong.composer }}

                        • {{ selectedSong.duration }}

                      </p>

                    </div>

                  </div>


                  <button
                    type="button"
                    (click)="closeSongInfo()"
                    class="w-9 h-9
                           rounded-full
                           bg-stone-100
                           hover:bg-stone-200
                           text-stone-600">

                    <i
                      class="fa-solid
                             fa-xmark">
                    </i>

                  </button>

                </div>


                <!-- ================================================= -->
                <!-- MUSICAL INFORMATION -->
                <!-- ================================================= -->

                <div
                  class="grid grid-cols-2
                         md:grid-cols-4 gap-3
                         mb-6">


                  <div
                    class="bg-amber-50
                           rounded-xl p-4
                           border border-amber-100">

                    <p
                      class="text-[10px]
                             uppercase
                             tracking-wide
                             text-amber-700
                             font-semibold">

                      Raga

                    </p>

                    <p
                      class="font-bold
                             text-stone-900 mt-1">

                      {{ selectedSong.raga }}

                    </p>

                  </div>


                  <div
                    class="bg-stone-50
                           rounded-xl p-4
                           border border-stone-100">

                    <p
                      class="text-[10px]
                             uppercase
                             tracking-wide
                             text-stone-500
                             font-semibold">

                      Taal

                    </p>

                    <p
                      class="font-bold
                             text-stone-900 mt-1">

                      {{ selectedSong.taal }}

                    </p>

                  </div>


                  <div
                    class="bg-stone-50
                           rounded-xl p-4
                           border border-stone-100">

                    <p
                      class="text-[10px]
                             uppercase
                             tracking-wide
                             text-stone-500
                             font-semibold">

                      Laya

                    </p>

                    <p
                      class="font-bold
                             text-stone-900 mt-1">

                      {{ selectedSong.laya }}

                    </p>

                  </div>


                  <div
                    class="bg-stone-50
                           rounded-xl p-4
                           border border-stone-100">

                    <p
                      class="text-[10px]
                             uppercase
                             tracking-wide
                             text-stone-500
                             font-semibold">

                      Mood

                    </p>

                    <p
                      class="font-bold
                             text-stone-900 mt-1">

                      {{ selectedSong.mood }}

                    </p>

                  </div>

                </div>


                <!-- ================================================= -->
                <!-- ABOUT + LYRICS -->
                <!-- ================================================= -->

                <div
                  class="grid grid-cols-1
                         lg:grid-cols-2
                         gap-6">


                  <!-- ABOUT -->

                  <div>

                    <h4
                      class="font-bold
                             text-stone-900
                             mb-3
                             flex items-center">

                      <i
                        class="fa-solid
                               fa-book-open
                               text-amber-800 mr-2">
                      </i>

                      About the Composition

                    </h4>


                    <p
                      class="text-sm
                             text-stone-600
                             leading-relaxed
                             mb-4">

                      {{ selectedSong.description }}

                    </p>


                    <div
                      class="bg-amber-50
                             border border-amber-100
                             rounded-xl p-4">

                      <p
                        class="text-xs
                               font-semibold
                               text-amber-900 mb-2">

                        Musical Structure

                      </p>


                      <p
                        class="text-xs
                               text-stone-600
                               leading-relaxed">

                        This composition is based on
                        <strong>
                          {{ selectedSong.raga }}
                        </strong>
                        and uses
                        <strong>
                          {{ selectedSong.taal }}
                        </strong>
                        as its rhythmic cycle.

                        The performance is generally
                        presented in
                        <strong>
                          {{ selectedSong.laya }}
                        </strong>
                        laya.

                      </p>

                    </div>

                  </div>


                  <!-- LYRICS -->

                  <div>

                    <div
                      class="flex justify-between
                             items-center mb-3">

                      <h4
                        class="font-bold
                               text-stone-900
                               flex items-center">

                        <i
                          class="fa-solid
                                 fa-feather-pointed
                                 text-amber-800 mr-2">
                        </i>

                        Lyrics

                      </h4>


                      <span
                        class="text-[10px]
                               bg-stone-100
                               text-stone-500
                               px-2 py-1
                               rounded-full">

                        Bandish Text

                      </span>

                    </div>


                    <div
                      class="bg-stone-50
                             border border-stone-200
                             rounded-xl p-5">

                      <p
                        class="text-sm
                               text-stone-700
                               leading-8
                               whitespace-pre-line
                               font-medium">

                        {{ selectedSong.lyrics }}

                      </p>

                    </div>

                  </div>

                </div>


                <!-- TAGS -->

                <div
                  class="flex flex-wrap
                         gap-2 mt-6">

                  @for (
                    tag of selectedSong.tags;
                    track tag
                  ) {

                    <span
                      class="text-[10px]
                             bg-amber-50
                             text-amber-800
                             px-3 py-1
                             rounded-full
                             font-medium">

                      #{{ tag }}

                    </span>

                  }

                </div>


                <!-- ACTIONS -->

                <div
                  class="flex flex-wrap gap-3
                         mt-6 pt-5
                         border-t
                         border-stone-100">


                  <button
                    type="button"
                    (click)="playSongSample(selectedSong)"
                    class="bg-amber-800
                           hover:bg-amber-900
                           text-white px-5
                           py-2.5 rounded-xl
                           text-xs font-semibold">

                    <i
                      class="fa-solid fa-play mr-2">
                    </i>

                    Play Sample

                  </button>


                  <button
                    type="button"
                    (click)="practiceSelectedSong()"
                    class="bg-stone-100
                           hover:bg-amber-50
                           text-stone-800
                           hover:text-amber-900
                           px-5 py-2.5
                           rounded-xl
                           text-xs font-semibold">

                    <i
                      class="fa-solid
                             fa-headphones mr-2">
                    </i>

                    Practice This Song

                  </button>


                  <button
                    type="button"
                    (click)="shareSong(selectedSong)"
                    class="bg-stone-100
                           hover:bg-amber-50
                           text-stone-800
                           px-5 py-2.5
                           rounded-xl
                           text-xs font-semibold">

                    <i
                      class="fa-solid
                             fa-share-nodes mr-2">
                    </i>

                    Share

                  </button>

                </div>

              </div>


              <!-- ================================================= -->
              <!-- RECOMMENDATIONS -->
              <!-- ================================================= -->

              <div
                class="bg-white
                       rounded-2xl
                       border border-stone-200
                       shadow-sm p-6 mt-6">


                <div class="mb-5">

                  <h3
                    class="font-bold
                           text-stone-900
                           text-lg
                           flex items-center">

                    <i
                      class="fa-solid
                             fa-wand-magic-sparkles
                             text-amber-800 mr-2">
                    </i>

                    You May Also Like

                  </h3>


                  <p
                    class="text-xs
                           text-stone-500 mt-1">

                    Recommendations based on
                    raga, taal, form, laya and
                    musical character.

                  </p>

                </div>


                <div
                  class="grid grid-cols-1
                         md:grid-cols-3 gap-4">


                  @for (
                    song of similarSongs();
                    track song.id
                  ) {

                    <button
                      type="button"
                      (click)="exploreSimilarSong(song)"
                      class="text-left
                             bg-stone-50
                             hover:bg-amber-50
                             border border-stone-200
                             hover:border-amber-200
                             rounded-xl p-4
                             transition">


                      <div
                        class="flex items-center
                               gap-3 mb-3">

                        <div
                          class="w-10 h-10
                                 rounded-lg
                                 bg-amber-100
                                 text-amber-900
                                 flex items-center
                                 justify-center">

                          <i
                            class="fa-solid
                                   fa-music
                                   text-sm">
                          </i>

                        </div>


                        <div
                          class="min-w-0">

                          <p
                            class="font-bold
                                   text-sm
                                   text-stone-900
                                   truncate">

                            {{ song.title }}

                          </p>

                          <p
                            class="text-[10px]
                                   text-stone-500">

                            {{ song.form }}

                          </p>

                        </div>

                      </div>


                      <div
                        class="flex flex-wrap
                               gap-1.5">

                        <span
                          class="text-[9px]
                                 bg-white
                                 border
                                 border-stone-200
                                 px-2 py-1
                                 rounded-full
                                 text-stone-600">

                          {{ song.raga }}

                        </span>


                        <span
                          class="text-[9px]
                                 bg-white
                                 border
                                 border-stone-200
                                 px-2 py-1
                                 rounded-full
                                 text-stone-600">

                          {{ song.taal }}

                        </span>

                      </div>


                      <div
                        class="flex items-center
                               justify-between
                               mt-4 pt-3
                               border-t
                               border-stone-200">

                        <span
                          class="text-[10px]
                                 text-stone-500">

                          {{ song.mood }}

                        </span>


                        <i
                          class="fa-solid
                                 fa-arrow-right
                                 text-amber-800
                                 text-xs">
                        </i>

                      </div>

                    </button>

                  }

                </div>

              </div>

            }

          </div>

        }


        <!-- ======================================================= -->
        <!-- RAAG & TAAL LISTENING QUIZ -->
        <!-- ======================================================= -->

        @if (activeTab() === 'quiz') {

          <section class="space-y-6">
            <div class="rounded-3xl bg-gradient-to-br from-amber-950 via-amber-900 to-stone-900 text-amber-50 p-7 md:p-9">
              <div class="flex flex-col md:flex-row md:items-end md:justify-between gap-5">
                <div>
                  <span class="inline-flex rounded-full bg-white/10 px-3 py-1 text-xs font-semibold tracking-wide text-amber-200">LISTENING PRACTICE</span>
                  <h2 class="text-3xl md:text-4xl font-bold mt-3">कानसेन - Train your ear. Recognize the Raag.</h2>
                  <p class="text-sm text-amber-100/80 mt-2 max-w-2xl">Identify the raga or taal from a musical clue. Build recognition skills one question at a time.</p>
                </div>
                <div class="flex gap-3">
                  <div class="rounded-2xl bg-white/10 px-4 py-3 min-w-24">
                    <p class="text-xs text-amber-200">Your score</p>
                    <p class="text-2xl font-bold">{{ quizScore() }}</p>
                  </div>
                  <div class="rounded-2xl bg-white/10 px-4 py-3 min-w-24">
                    <p class="text-xs text-amber-200">Streak</p>
                    <p class="text-2xl font-bold">🔥 {{ learningStreak }}</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- AUDIO EAR-TRAINING ROUND -->
            <section class="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 md:p-8 space-y-5">
              <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <span class="text-xs font-bold uppercase tracking-wider text-amber-800">NEW · AUDIO CHALLENGE</span>
                  <h3 class="text-2xl font-bold text-stone-900 mt-1">Listen, recognize, answer</h3>
                  <p class="text-sm text-stone-600 mt-1">Play the phrase as many times as you need. Then identify the raag or the swara notation.</p>
                </div>
                <div class="inline-flex rounded-xl bg-stone-100 p-1 self-start">
                  <button type="button" (click)="setAudioQuizMode('raag')"
                    class="rounded-lg px-4 py-2 text-sm font-semibold transition"
                    [class.bg-white]="audioQuizMode() === 'raag'"
                    [class.shadow-sm]="audioQuizMode() === 'raag'"
                    [class.text-amber-900]="audioQuizMode() === 'raag'"
                    [class.text-stone-600]="audioQuizMode() !== 'raag'">Guess the raag</button>
                  <button type="button" (click)="setAudioQuizMode('notation')"
                    class="rounded-lg px-4 py-2 text-sm font-semibold transition"
                    [class.bg-white]="audioQuizMode() === 'notation'"
                    [class.shadow-sm]="audioQuizMode() === 'notation'"
                    [class.text-amber-900]="audioQuizMode() === 'notation'"
                    [class.text-stone-600]="audioQuizMode() !== 'notation'">Guess notation</button>
                </div>
              </div>

              <div class="rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-100 p-5 md:p-6">
                <div class="flex flex-col sm:flex-row sm:items-center gap-4">
                  <button type="button" (click)="playAudioQuizClip()"
                    class="shrink-0 w-16 h-16 rounded-full bg-amber-800 hover:bg-amber-900 text-white shadow-md flex items-center justify-center text-2xl"
                    aria-label="Play the musical phrase">
                    <i class="fa-solid fa-play"></i>
                  </button>
                  <div class="min-w-0 flex-1">
                    <p class="text-xs font-bold uppercase tracking-wider text-amber-800">Audio clip {{ audioQuizIndex() + 1 }} of {{ audioQuizClips.length }}</p>
                    <h4 class="text-lg font-bold text-stone-900 mt-1">{{ audioQuizMode() === 'raag' ? 'Which raag does this phrase suggest?' : 'Which swara notation matches what you heard?' }}</h4>
                    <p class="text-sm text-stone-600 mt-1">A short synthesized swara phrase at a steady tempo. Press play to listen again.</p>
                  </div>
                  <span class="text-xs font-semibold text-amber-900 bg-white/70 rounded-full px-3 py-2">Sa = C</span>
                </div>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                @for (option of audioQuizOptions(); track option) {
                  <button type="button" (click)="chooseAudioQuizAnswer(option)"
                    [disabled]="audioQuizSubmitted()"
                    class="rounded-xl border px-4 py-4 text-left text-sm font-semibold transition"
                    [class.border-amber-800]="selectedAudioQuizAnswer() === option"
                    [class.bg-amber-50]="selectedAudioQuizAnswer() === option"
                    [class.text-amber-950]="selectedAudioQuizAnswer() === option"
                    [class.border-stone-200]="selectedAudioQuizAnswer() !== option"
                    [class.bg-white]="selectedAudioQuizAnswer() !== option"
                    [class.opacity-60]="audioQuizSubmitted() && selectedAudioQuizAnswer() !== option">{{ option }}</button>
                }
              </div>

              @if (audioQuizSubmitted()) {
                <div class="rounded-xl border p-4"
                  [class.bg-emerald-50]="audioQuizWasCorrect()"
                  [class.border-emerald-200]="audioQuizWasCorrect()"
                  [class.text-emerald-900]="audioQuizWasCorrect()"
                  [class.bg-rose-50]="!audioQuizWasCorrect()"
                  [class.border-rose-200]="!audioQuizWasCorrect()"
                  [class.text-rose-900]="!audioQuizWasCorrect()">
                  <p class="font-bold text-sm">{{ audioQuizWasCorrect() ? 'Correct! Great listening.' : 'Good try — listen once more.' }}</p>
                  <p class="text-sm mt-1">{{ audioQuizMode() === 'raag' ? 'Raag: ' + currentAudioQuizClip().raag : 'Notation: ' + currentAudioQuizClip().notation }}</p>
                  <p class="text-xs mt-1 opacity-80">These are simplified learning phrases; a raag is identified by its grammar and characteristic movement, not by one phrase alone.</p>
                </div>
              }

              <div class="flex flex-wrap gap-3">
                @if (!audioQuizSubmitted()) {
                  <button type="button" (click)="submitAudioQuizAnswer()" [disabled]="!selectedAudioQuizAnswer()"
                    class="rounded-xl bg-amber-800 hover:bg-amber-900 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold py-3 px-5">Check answer</button>
                } @else {
                  <button type="button" (click)="nextAudioQuizClip()" class="rounded-xl bg-amber-800 hover:bg-amber-900 text-white font-bold py-3 px-5">Next audio clip</button>
                }
                <button type="button" (click)="resetAudioQuiz()" class="rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold py-3 px-5">Restart audio round</button>
                <span class="self-center text-xs text-stone-500">Audio round score: {{ audioQuizCorrectCount() }} / {{ audioQuizClips.length }}</span>
              </div>
            </section>

            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div class="lg:col-span-2 bg-white rounded-2xl border border-stone-200 shadow-sm p-6 md:p-8">
                <div class="flex items-center justify-between gap-3">
                  <span class="text-xs font-bold uppercase tracking-wider text-amber-800">Question {{ quizIndex() + 1 }} of {{ quizQuestions.length }}</span>
                  <span class="text-xs rounded-full bg-amber-50 text-amber-900 px-3 py-1 font-semibold">{{ currentQuizQuestion().category }}</span>
                </div>

                <div class="mt-6 rounded-2xl bg-stone-50 border border-stone-100 p-6">
                  <p class="text-xs uppercase tracking-widest text-stone-500 font-semibold mb-2">Listen & identify</p>
                  <h3 class="text-xl md:text-2xl font-bold text-stone-900">{{ currentQuizQuestion().prompt }}</h3>
                  <p class="text-sm text-stone-600 mt-3 leading-relaxed">{{ currentQuizQuestion().clue }}</p>
                  <p class="text-xs text-stone-400 mt-4">Audio playback can be connected to a performance recording in a future iteration; this prototype uses listening-theory clues.</p>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
                  @for (option of currentQuizQuestion().options; track option) {
                    <button type="button"
                      (click)="chooseQuizAnswer(option)"
                      [disabled]="quizSubmitted()"
                      class="rounded-xl border px-4 py-4 text-left text-sm font-semibold transition"
                      [class.border-amber-800]="selectedQuizAnswer() === option"
                      [class.bg-amber-50]="selectedQuizAnswer() === option"
                      [class.text-amber-950]="selectedQuizAnswer() === option"
                      [class.border-stone-200]="selectedQuizAnswer() !== option"
                      [class.bg-white]="selectedQuizAnswer() !== option"
                      [class.opacity-60]="quizSubmitted() && selectedQuizAnswer() !== option">
                      <span class="inline-flex w-7 h-7 rounded-full bg-stone-100 items-center justify-center text-xs mr-2">{{ $index + 1 }}</span>
                      {{ option }}
                    </button>
                  }
                </div>

                @if (quizSubmitted()) {
                  <div class="mt-5 rounded-xl p-4 border"
                    [class.bg-emerald-50]="quizWasCorrect()"
                    [class.border-emerald-200]="quizWasCorrect()"
                    [class.text-emerald-900]="quizWasCorrect()"
                    [class.bg-rose-50]="!quizWasCorrect()"
                    [class.border-rose-200]="!quizWasCorrect()"
                    [class.text-rose-900]="!quizWasCorrect()">
                    <p class="font-bold text-sm">{{ quizWasCorrect() ? 'Correct! Well heard.' : 'Not quite — keep listening.' }}</p>
                    <p class="text-sm mt-1">{{ currentQuizQuestion().explanation }}</p>
                    @if (!quizWasCorrect()) {
                      <p class="text-sm mt-2 font-semibold">Correct answer: {{ currentQuizQuestion().answer }}</p>
                    }
                  </div>
                }

                <div class="flex flex-col sm:flex-row gap-3 mt-6">
                  @if (!quizSubmitted()) {
                    <button type="button" (click)="submitQuizAnswer()" [disabled]="!selectedQuizAnswer()"
                      class="flex-1 rounded-xl bg-amber-800 hover:bg-amber-900 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold py-3 px-5">
                      Check answer
                    </button>
                  } @else {
                    <button type="button" (click)="nextQuizQuestion()" class="flex-1 rounded-xl bg-amber-800 hover:bg-amber-900 text-white font-bold py-3 px-5">
                      Next question <i class="fa-solid fa-arrow-right ml-2"></i>
                    </button>
                  }
                  <button type="button" (click)="resetQuiz()" class="rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold py-3 px-5">
                    Restart quiz
                  </button>
                </div>
              </div>

              <aside class="space-y-4">
                <div class="bg-white rounded-2xl border border-stone-200 p-6">
                  <h3 class="font-bold text-stone-900">Learning tips</h3>
                  <ul class="mt-4 space-y-3 text-sm text-stone-600">
                    <li class="flex gap-2"><span class="text-amber-700">♪</span><span>Notice the characteristic phrases (pakad), not just individual notes.</span></li>
                    <li class="flex gap-2"><span class="text-amber-700">♪</span><span>Compare the mood and time traditionally associated with each raga.</span></li>
                    <li class="flex gap-2"><span class="text-amber-700">♪</span><span>Clap the taal cycle and locate its sam.</span></li>
                  </ul>
                </div>
                <div class="bg-amber-50 rounded-2xl border border-amber-100 p-6">
                  <p class="text-xs uppercase tracking-wider font-bold text-amber-800">Your progress</p>
                  <p class="text-3xl font-bold text-stone-900 mt-2">{{ quizCorrectCount() }} <span class="text-base font-medium text-stone-500">correct</span></p>
                  <p class="text-xs text-stone-600 mt-1">Across this quiz session</p>
                  <div class="h-2 rounded-full bg-amber-100 overflow-hidden mt-4">
                    <div class="h-full bg-amber-700 rounded-full" [style.width.%]="quizProgress()"></div>
                  </div>
                  <p class="text-xs text-stone-500 mt-2">{{ quizProgress() }}% completion</p>
                </div>
              </aside>
            </div>
          </section>
        }


        <!-- ======================================================= -->
        <!-- LEARNER PROFILE / PROGRESS -->
        <!-- ======================================================= -->

        @if (activeTab() === 'profile') {

          <section class="space-y-6">
            <div class="flex flex-col sm:flex-row sm:items-center gap-4 bg-white rounded-2xl border border-stone-200 p-6">
              <div class="w-16 h-16 rounded-full bg-amber-800 text-white flex items-center justify-center text-2xl font-bold">AK</div>
              <div class="flex-1">
                <h2 class="text-2xl font-bold text-stone-900">Aarav Kulkarni</h2>
                <p class="text-sm text-stone-500">Sitar Student • Pune Gharana</p>
              </div>
              <span class="rounded-full bg-amber-100 text-amber-900 px-4 py-2 text-xs font-bold">Sadhaka</span>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div class="bg-white rounded-2xl border border-stone-200 p-5"><p class="text-xs text-stone-500">Quiz score</p><p class="text-3xl font-bold text-amber-900 mt-1">{{ quizScore() }}</p></div>
              <div class="bg-white rounded-2xl border border-stone-200 p-5"><p class="text-xs text-stone-500">Learning streak</p><p class="text-3xl font-bold text-stone-900 mt-1">🔥 {{ learningStreak }} days</p></div>
              <div class="bg-white rounded-2xl border border-stone-200 p-5"><p class="text-xs text-stone-500">Practice sessions</p><p class="text-3xl font-bold text-stone-900 mt-1">{{ practiceLogs().length }}</p></div>
            </div>

            <div class="bg-white rounded-2xl border border-stone-200 p-6">
              <h3 class="font-bold text-stone-900 text-lg mb-4">Recent Riyaz Sessions</h3>
              <div class="space-y-3">
                @for (log of practiceLogs(); track log.id) {
                  <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 bg-stone-50 rounded-xl p-4">
                    <div><p class="font-semibold text-stone-900 text-sm">{{ log.raga }}</p><p class="text-xs text-stone-500 mt-1">{{ log.notes }}</p></div>
                    <span class="text-xs font-semibold text-amber-900 whitespace-nowrap">{{ log.durationMinutes }} min • {{ log.date }}</span>
                  </div>
                }
              </div>
            </div>

            <div class="flex flex-wrap gap-3">
              <button type="button" (click)="activeTab.set('quiz')" class="rounded-xl bg-amber-800 hover:bg-amber-900 text-white font-semibold text-sm px-5 py-3">Continue quiz</button>
              <button type="button" (click)="activeTab.set('sadhana')" class="rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold text-sm px-5 py-3">Open practice room</button>
            </div>
          </section>
        }

      </main>


      <!-- ========================================================= -->
      <!-- FOOTER -->
      <!-- ========================================================= -->

      <footer
        class="bg-white
               border-t border-stone-200
               mt-16 py-8
               text-center
               text-xs text-stone-500">

        <p
          class="font-medium
                 text-stone-800 mb-1">

          Swara-Setu • A Digital Home
          for Indian Classical Music

        </p>

        <p>

          © 2026 Global Platform Initiative.
          Connecting Tradition with the Digital Generation.

        </p>

      </footer>

    </div>
  `,

  changeDetection: ChangeDetectionStrategy.OnPush
})
export class App {

  /* ============================================================= */
  /* NAVIGATION */
  /* ============================================================= */

  activeTab =
    signal<'feed' | 'sadhana' | 'artists' | 'events' | 'discover' | 'quiz' | 'profile'>(
      'feed'
    );

  tabs = [
    {
      id: 'feed',
      label: 'Community Feed',
      icon: 'fa-solid fa-globe'
    },
    {
      id: 'sadhana',
      label: 'Sadhana & Tanpura',
      icon: 'fa-solid fa-headphones-simple'
    },
    {
      id: 'artists',
      label: 'Gurus & Artists',
      icon: 'fa-solid fa-users'
    },
    {
      id: 'events',
      label: 'Events & Concerts',
      icon: 'fa-solid fa-calendar-days'
    },
    {
      id: 'discover',
      label: 'Discover Ragas & Songs',
      icon: 'fa-solid fa-compass'
    },
    {
      id: 'quiz',
      label: 'Raag & Taal Quiz',
      icon: 'fa-solid fa-circle-question'
    },
    {
      id: 'profile',
      label: 'My Learning',
      icon: 'fa-solid fa-user'
    }
  ] as const;


  /* ============================================================= */
  /* RAAG & TAAL QUIZ / GAMIFICATION */
  /* ============================================================= */

  learningStreak = 5;

  quizScore = signal(120);
  quizIndex = signal(0);
  selectedQuizAnswer = signal('');
  quizSubmitted = signal(false);
  quizCorrectCount = signal(0);

  quizQuestions = [
    {
      category: 'Raga recognition',
      prompt: 'Which raga is commonly associated with the first quarter of the night and uses tivra Madhyam?',
      clue: 'Its characteristic ascent is often taught as Ni Re Ga Ma(tivra) Pa Dha Ni Sa.',
      options: ['Raga Bhairav', 'Raga Yaman', 'Raga Bhupali', 'Raga Durga'],
      answer: 'Raga Yaman',
      explanation: 'Yaman is a Kalyan-thaat raga characterized by tivra Madhyam and is traditionally performed in the evening.'
    },
    {
      category: 'Taal recognition',
      prompt: 'How many matras are there in Teentaal?',
      clue: 'This widely used Hindustani taal has four equal vibhags.',
      options: ['6 matras', '7 matras', '10 matras', '16 matras'],
      answer: '16 matras',
      explanation: 'Teentaal has 16 matras arranged in four groups of four.'
    },
    {
      category: 'Raga recognition',
      prompt: 'Which raga uses only five notes in its aroha and avaroha and avoids Ma and Ni?',
      clue: 'Its swaras are Sa, Re, Ga, Pa and Dha.',
      options: ['Raga Bhupali', 'Raga Kafi', 'Raga Bageshri', 'Raga Yaman'],
      answer: 'Raga Bhupali',
      explanation: 'Bhupali is an audav-audav raga using Sa Re Ga Pa Dha in both ascent and descent.'
    },
    {
      category: 'Taal recognition',
      prompt: 'Which taal is commonly counted as 10 matras?',
      clue: 'Its vibhag structure is 2 + 3 + 2 + 3.',
      options: ['Rupak', 'Jhaptal', 'Ektaal', 'Teentaal'],
      answer: 'Jhaptal',
      explanation: 'Jhaptal contains 10 matras in four vibhags: 2, 3, 2 and 3.'
    }
  ];

  currentQuizQuestion = computed(() => this.quizQuestions[this.quizIndex()]);

  quizWasCorrect = computed(() =>
    this.selectedQuizAnswer() === this.currentQuizQuestion().answer
  );

  quizProgress = computed(() =>
    Math.round(((this.quizIndex() + (this.quizSubmitted() ? 1 : 0)) / this.quizQuestions.length) * 100)
  );


  /* AUDIO LISTENING CHALLENGE: short synthesized Hindustani swara phrases */
  audioQuizMode = signal<'raag' | 'notation'>('raag');
  audioQuizIndex = signal(0);
  selectedAudioQuizAnswer = signal('');
  audioQuizSubmitted = signal(false);
  audioQuizCorrectCount = signal(0);

  audioQuizClips = [
    {
      raag: 'Yaman',
      notation: 'N R G M^ | G R S',
      notes: ['N', 'R', 'G', 'm', 'G', 'R', 'S'],
      raagOptions: ['Yaman', 'Bhupali', 'Bhairav', 'Durga'],
      notationOptions: ['N R G M^ | G R S', 'S R G P | D P G R S', 'S r G M | P d P M G', 'S R M P | D P M R S']
    },
    {
      raag: 'Bhupali',
      notation: 'S R G P D | P G R S',
      notes: ['S', 'R', 'G', 'P', 'D', 'P', 'G', 'R', 'S'],
      raagOptions: ['Bageshri', 'Yaman', 'Bhupali', 'Kafi'],
      notationOptions: ['N R G M^ | G R S', 'S R G P | D P G R S', 'S r G M | P d P M G', 'S R M P | D P M R S']
    },
    {
      raag: 'Bhairav',
      notation: 'S r G M | P d N S',
      notes: ['S', 'r', 'G', 'M', 'P', 'd', 'N', 'S'],
      raagOptions: ['Bhairav', 'Khamaj', 'Desh', 'Bhupali'],
      notationOptions: ['S R G P | D P G R S', 'S r G M | P d N S', 'N R G M^ | G R S', 'S R M P | D P M R S']
    },
    {
      raag: 'Durga',
      notation: 'S R M P D | P M R S',
      notes: ['S', 'R', 'M', 'P', 'D', 'P', 'M', 'R', 'S'],
      raagOptions: ['Yaman', 'Durga', 'Bhairav', 'Bhupali'],
      notationOptions: ['S R G P | D P G R S', 'S R M P | D P M R S', 'N R G M^ | G R S', 'S r G M | P d N S']
    }
  ];

  currentAudioQuizClip = computed(() => this.audioQuizClips[this.audioQuizIndex()]);
  audioQuizOptions = computed(() => this.audioQuizMode() === 'raag'
    ? this.currentAudioQuizClip().raagOptions
    : this.currentAudioQuizClip().notationOptions);
  audioQuizWasCorrect = computed(() => this.selectedAudioQuizAnswer() ===
    (this.audioQuizMode() === 'raag' ? this.currentAudioQuizClip().raag : this.currentAudioQuizClip().notation));


  /* ============================================================= */
  /* FORM CONTROLS */
  /* ============================================================= */

  newPostContent = new FormControl('');

  artistSearch = new FormControl('');

  practiceRagaCtrl = new FormControl('');

  practiceDurationCtrl = new FormControl('');

  practiceNotesCtrl = new FormControl('');

  /* NEW */

  songSearch = new FormControl('');


  /* ============================================================= */
  /* TANPURA */
  /* ============================================================= */

  isTanpuraPlaying = signal(false);

  rootNotes = [
    'C (Sa)',
    'C# (Sa)',
    'D (Sa)',
    'G# (Female Sa)'
  ];

  selectedRootNote = 'C (Sa)';

  selectedTanpuraStyle =
    'Traditional Pancham (Pa)';


  /* ============================================================= */
  /* SWARA + TAAL */
  /* ============================================================= */

  selectedPracticeTaal = 'Teental';

  practiceBpm = 100;

  activeSwara = '';

  activeTaalBeat = -1;

  isTaalPracticePlaying =
    signal(false);

  private taalPracticeTimer:
    ReturnType<typeof setInterval> | null = null;

  private practiceAudioContext:
    AudioContext | null = null;


  availableTaals = [
    'Teental',
    'Keherwa',
    'Dadra',
    'Rupak'
  ];


  practiceSwaras = [
    { name: 'S', type: 'Shuddha' },
    { name: 'r', type: 'Komal' },
    { name: 'R', type: 'Shuddha' },
    { name: 'g', type: 'Komal' },
    { name: 'G', type: 'Shuddha' },
    { name: 'M', type: 'Shuddha' },
    { name: 'm', type: 'Teevra' },
    { name: 'P', type: 'Shuddha' },
    { name: 'd', type: 'Komal' },
    { name: 'D', type: 'Shuddha' },
    { name: 'n', type: 'Komal' },
    { name: 'N', type: 'Shuddha' }
  ];


  taalStructures: Record<string, TaalBeat[]> = {

    Teental: [

      { matra: 1, bol: 'Dha', type: 'Sam (X)' },
      { matra: 2, bol: 'Dhin', type: 'Tali 1' },
      { matra: 3, bol: 'Dhin', type: 'Tali 1' },
      { matra: 4, bol: 'Dha', type: 'Tali 1' },

      { matra: 5, bol: 'Dha', type: 'Tali 2' },
      { matra: 6, bol: 'Dhin', type: 'Tali 2' },
      { matra: 7, bol: 'Dhin', type: 'Tali 2' },
      { matra: 8, bol: 'Dha', type: 'Tali 2' },

      { matra: 9, bol: 'Dha', type: 'Khali (0)' },
      { matra: 10, bol: 'Tin', type: 'Khali' },
      { matra: 11, bol: 'Tin', type: 'Khali' },
      { matra: 12, bol: 'Ta', type: 'Khali' },

      { matra: 13, bol: 'Ta', type: 'Tali 3' },
      { matra: 14, bol: 'Dhin', type: 'Tali 3' },
      { matra: 15, bol: 'Dhin', type: 'Tali 3' },
      { matra: 16, bol: 'Dha', type: 'Tali 3' }

    ],

    Keherwa: [

      { matra: 1, bol: 'Dha', type: 'Sam (X)' },
      { matra: 2, bol: 'Ge', type: 'Tali' },
      { matra: 3, bol: 'Na', type: 'Tali' },
      { matra: 4, bol: 'Ti', type: 'Tali' },

      { matra: 5, bol: 'Na', type: 'Khali (0)' },
      { matra: 6, bol: 'Ka', type: 'Khali' },
      { matra: 7, bol: 'Dhin', type: 'Khali' },
      { matra: 8, bol: 'Na', type: 'Khali' }

    ],

    Dadra: [

      { matra: 1, bol: 'Dha', type: 'Sam (X)' },
      { matra: 2, bol: 'Dhi', type: 'Tali' },
      { matra: 3, bol: 'Na', type: 'Tali' },

      { matra: 4, bol: 'Dha', type: 'Khali (0)' },
      { matra: 5, bol: 'Tu', type: 'Khali' },
      { matra: 6, bol: 'Na', type: 'Khali' }

    ],

    Rupak: [

      { matra: 1, bol: 'Tin', type: 'Khali (0)' },
      { matra: 2, bol: 'Tin', type: 'Khali' },
      { matra: 3, bol: 'Na', type: 'Khali' },

      { matra: 4, bol: 'Dhin', type: 'Tali 2' },
      { matra: 5, bol: 'Na', type: 'Tali 2' },

      { matra: 6, bol: 'Dhin', type: 'Tali 3' },
      { matra: 7, bol: 'Na', type: 'Tali 3' }

    ]

  };


  practiceTaalBeats =
    this.taalStructures[this.selectedPracticeTaal];


  /* ============================================================= */
  /* PRACTICE LOGS */
  /* ============================================================= */

  practiceLogs =
    signal<PracticeLog[]>([

      {
        id: 1,
        raga: 'Raga Yaman',
        durationMinutes: 45,
        notes:
          'Worked on vilambit khayal steady laya and meend across Gandhaar.',
        date: 'Yesterday, 6:00 PM'
      },

      {
        id: 2,
        raga: 'Alankars & Shrutis',
        durationMinutes: 30,
        notes:
          'Palta practice in three speeds (Drut Laya).',
        date: 'Oct 4, 2026'
      }

    ]);


  /* ============================================================= */
  /* POSTS */
  /* ============================================================= */

  posts =
    signal<Post[]>([

      {
        id: 1,
        author: 'Pandit Rameshwar Mishra',
        role: 'Senior Sitar Guru • Maihar Gharana',
        avatar: 'PM',
        time: '2 hours ago',
        content:
          'My upcoming Sitar recital featuring Raga Puriya Dhanashree will be broadcast live this Sunday from Triveni Kala Kendra. All classical music lovers are cordially invited.',
        likes: 42,
        commentsCount: 3,
        liked: false,
        comments: [
          'Looking forward to the recital guruji!',
          'Will the recording be available for international students?'
        ]
      },

      {
        id: 2,
        author: 'Ananya Deshmukh',
        role: 'Hindustani Vocal Student',
        avatar: 'AD',
        time: '5 hours ago',
        content:
          'Completed 3 years of rigorous Khayal practice today under my guru ji! Grateful for this digital platform connecting me with fellow seekers across the globe.',
        likes: 28,
        commentsCount: 1,
        liked: true,
        comments: [
          'Heartiest congratulations Ananya! Keep scaling new musical heights.'
        ]
      },

      {
        id: 3,
        author: 'Sangeet Academy London',
        role: 'Cultural Institution',
        avatar: 'SA',
        time: '1 day ago',
        content:
          'Admissions are now officially open for our online Dhrupad masterclass series led by senior exponents. Limited seats available for overseas learners.',
        likes: 65,
        commentsCount: 4,
        liked: false,
        comments: [
          'How can students from the US enroll?'
        ]
      }

    ]);


  /* ============================================================= */
  /* ARTISTS */
  /* ============================================================= */

  artists: Artist[] = [

    {
      id: 1,
      name: 'Pandit Rameshwar Mishra',
      discipline: 'Sitar & Instrumental',
      gharana: 'Maihar Gharana',
      location: 'Varanasi, India',
      bio:
        'Exponent of the Senia Maihar tradition with over 35 years of global concert experience and teaching.',
      image: 'PM',
      rating: 4.9
    },

    {
      id: 2,
      name: 'Vidushi Dr. Sunita Kulkarni',
      discipline: 'Hindustani Classical Vocal',
      gharana: 'Kirana Gharana',
      location: 'Pune, India',
      bio:
        'Renowned khayal vocalist and professor of musicology, specializing in vilambit khayal and taan techniques.',
      image: 'SK',
      rating: 4.8
    },

    {
      id: 3,
      name: 'Pt. Ravi Shankar Iyer',
      discipline: 'Carnatic Veena & Flute',
      gharana: 'Carnatic Tradition',
      location: 'Chennai, India',
      bio:
        'Master instrumentalist blending traditional Carnatic intricacies with global musical collaborations.',
      image: 'RI',
      rating: 4.9
    },

    {
      id: 4,
      name: 'Sitar Academy Europe',
      discipline: 'Music Institution',
      gharana: 'Global Outreach',
      location: 'Berlin, Germany',
      bio:
        'Dedicated cultural academy promoting Indian classical music education, workshops, and student recitals in Europe.',
      image: 'AE',
      rating: 4.7
    },

    {
      id: 5,
      name: 'Ustad Tariq Khan',
      discipline: 'Tabla & Percussion',
      gharana: 'Delhi Gharana',
      location: 'Lucknow, India',
      bio:
        'Accomplished tabla maestro known for exquisite accompaniment and solo improvisations.',
      image: 'UT',
      rating: 4.9
    },

    {
      id: 6,
      name: 'Meera Nambiar',
      discipline: 'Bharatanatyam & Classical Arts',
      gharana: 'Thanjavur Bani',
      location: 'New York, USA',
      bio:
        'Performing artist and educator bridging classical rhythm and dance aesthetics across international stages.',
      image: 'MN',
      rating: 4.6
    }

  ];


  filteredArtists = computed(() => {

    const query =
      (this.artistSearch.value || '')
        .toLowerCase()
        .trim();

    if (!query) {
      return this.artists;
    }

    return this.artists.filter(artist =>
      artist.name.toLowerCase().includes(query) ||
      artist.discipline.toLowerCase().includes(query) ||
      artist.gharana.toLowerCase().includes(query)
    );

  });


  /* ============================================================= */
  /* EVENTS */
  /* ============================================================= */

  eventsList: EventItem[] = [

    {
      id: 1,
      title: 'Annual Saptak Classical Festival',
      artist: 'Various Maestros',
      date: 'Jan 15 - Jan 22, 2026',
      location: 'Ahmedabad & Global Live Stream',
      type: 'Festival',
      price: 'Free / RSVP'
    },

    {
      id: 2,
      title: 'Morning Ragas & Dhrupad Recital',
      artist: 'Gundecha Brothers Disciple Group',
      date: 'Sunday, Oct 18, 2026',
      location: 'Triveni Kala Kendra, New Delhi',
      type: 'Concert',
      price: '$15 / ₹500'
    },

    {
      id: 3,
      title: 'Masterclass: Art of Taan in Khayal',
      artist: 'Dr. Sunita Kulkarni',
      date: 'Saturday, Oct 24, 2026',
      location: 'Online Global Session',
      type: 'Masterclass',
      price: '$30 / ₹1000'
    },

    {
      id: 4,
      title: 'Global Sitar Conclave & Workshop',
      artist: 'Pandit Rameshwar Mishra',
      date: 'November 5, 2026',
      location: 'London Cultural Center, UK',
      type: 'Workshop',
      price: '$45'
    }

  ];


  /* ============================================================= */
  /* RAGAS */
  /* ============================================================= */

  ragas: RagaItem[] = [

    {
      name: 'Raga Yaman',
      time: 'First Quarter of Night',
      thaat: 'Kalyan',
      mood: 'Bhakti, Peace, Romance',
      description:
        'One of the most fundamental and auspicious evening ragas. Features Tivra Ma and all other natural notes.'
    },

    {
      name: 'Raga Bhairav',
      time: 'Early Morning (Dawn)',
      thaat: 'Bhairav',
      mood: 'Devotion, Seriousness, Awakening',
      description:
        'A majestic morning raga utilizing Komal Re and Komal Dha, invoking deep meditative calm.'
    },

    {
      name: 'Raga Darbari Kanada',
      time: 'Midnight',
      thaat: 'Asavari',
      mood: 'Majestic, Profound, Melancholic',
      description:
        'Known for its slow, grave movements and deep gamak-based expression.'
    }

  ];


  /* ============================================================= */
  /* SONG EXPLORER */
  /* ============================================================= */

  songs: SongItem[] = [

    {
      id: 1,
      title: 'Eri Aali Piya Bin',
      artist: 'Traditional / Agra Gharana',
      form: 'Drut Khayal',
      raga: 'Raga Yaman',
      taal: 'Teentaal',
      laya: 'Drut',
      mood: 'Romantic, longing, devotional',
      composer: 'Traditional',
      duration: '6:42',

      description:
        'A popular Yaman bandish expressing the restlessness of separation from the beloved. The composition demonstrates the luminous character of Yaman within a lively Teentaal framework.',

      lyrics:
        `Eri aali piya bin, sakhi
Kal na parat mohe, ghari pal chhin din

Jab se piya pardes gavan kino
Ratiyan katat hain taare gin-gin`,

      tags: [
        'Yaman',
        'Teentaal',
        'Khayal',
        'Agra Gharana',
        'Longing'
      ]
    },


    {
      id: 2,
      title: 'Piya Ki Najariya Jaadu Bhari',
      artist: 'Hindustani Classical',
      form: 'Drut Khayal',
      raga: 'Raga Yaman',
      taal: 'Teentaal',
      laya: 'Drut',
      mood: 'Romantic, joyful',
      composer: 'Traditional',
      duration: '7:15',

      description:
        'A lively composition in Raga Yaman celebrating the enchanting gaze of the beloved.',

      lyrics:
        `Piya ki najariya jaadu bhari
Mora man mohe, mora man mohe

Dekhat hi chain na aaye
Piya ki najariya jaadu bhari`,

      tags: [
        'Yaman',
        'Teentaal',
        'Khayal',
        'Romance'
      ]
    },


    {
      id: 3,
      title: 'Guru Bin Kaise Gun Gaaye',
      artist: 'Hindustani Classical',
      form: 'Bandish',
      raga: 'Raga Yaman',
      taal: 'Teentaal',
      laya: 'Madhya',
      mood: 'Devotional, reflective',
      composer: 'Traditional',
      duration: '5:50',

      description:
        'A devotional composition reflecting on the importance of the guru in acquiring musical knowledge and wisdom.',

      lyrics:
        `Guru bin kaise gun gaaye
Guru naa maane to gun naahi aaye

Guniyan mein vey guni kahave
Maane to rijhave sabko`,

      tags: [
        'Yaman',
        'Teentaal',
        'Guru',
        'Devotional'
      ]
    },


    {
      id: 4,
      title: 'Jaago Mohan Pyaare',
      artist: 'Hindustani Vocal',
      form: 'Drut Khayal',
      raga: 'Raga Bhairav',
      taal: 'Teentaal',
      laya: 'Drut',
      mood: 'Devotional, awakening',
      composer: 'Traditional',
      duration: '6:20',

      description:
        'A morning-oriented composition carrying the serious and devotional character associated with Raga Bhairav.',

      lyrics:
        `Jaago Mohan Pyaare
Bhor bhayi ab jaago

Nainan neer bahave
Daras tumhare paavo`,

      tags: [
        'Bhairav',
        'Teentaal',
        'Morning',
        'Devotional'
      ]
    },


    {
      id: 5,
      title: 'Sakhi Mori Rumjhum',
      artist: 'Hindustani Classical',
      form: 'Madhya Laya Khayal',
      raga: 'Raga Durga',
      taal: 'Jhaptaal',
      laya: 'Madhya',
      mood: 'Graceful, joyful',
      composer: 'Traditional',
      duration: '5:35',

      description:
        'A graceful composition in Raga Durga presented in a medium tempo Jhaptaal framework.',

      lyrics:
        `Sakhi mori rumjhum
Aaj badariya chhayi

Man mohan ghar aaye
Sakhi mori rumjhum`,

      tags: [
        'Durga',
        'Jhaptaal',
        'Khayal',
        'Madhya Laya'
      ]
    }

  ];


  /* ============================================================= */
  /* SELECTED SONG */
  /* ============================================================= */

  selectedSong: SongItem | null = null;


  /* ============================================================= */
  /* SONG SEARCH */
  /* ============================================================= */

  filteredSongs = computed(() => {

    const query =
      (this.songSearch.value || '')
        .trim()
        .toLowerCase();

    if (!query) {
      return this.songs;
    }

    return this.songs.filter(song =>

      song.title.toLowerCase().includes(query) ||

      song.artist.toLowerCase().includes(query) ||

      song.raga.toLowerCase().includes(query) ||

      song.taal.toLowerCase().includes(query) ||

      song.form.toLowerCase().includes(query) ||

      song.mood.toLowerCase().includes(query) ||

      song.tags.some(tag =>
        tag.toLowerCase().includes(query)
      )

    );

  });


  /* ============================================================= */
  /* SIMILAR SONG RECOMMENDATION ENGINE */
  /* ============================================================= */

  similarSongs = computed(() => {

    if (!this.selectedSong) {
      return [];
    }

    const selected =
      this.selectedSong;

    return this.songs

      .filter(song =>
        song.id !== selected.id
      )

      .map(song => {

        let score = 0;

        /*
         * Same Raga is strongest signal.
         */
        if (
          song.raga === selected.raga
        ) {
          score += 5;
        }

        /*
         * Same Taal.
         */
        if (
          song.taal === selected.taal
        ) {
          score += 3;
        }

        /*
         * Same musical form.
         */
        if (
          song.form === selected.form
        ) {
          score += 2;
        }

        /*
         * Same Laya.
         */
        if (
          song.laya === selected.laya
        ) {
          score += 1;
        }

        /*
         * Shared tags.
         */
        const sharedTags =
          song.tags.filter(tag =>
            selected.tags.includes(tag)
          );

        score += sharedTags.length;

        return {
          song,
          score
        };

      })

      .sort((a, b) =>
        b.score - a.score
      )

      .slice(0, 3)

      .map(item =>
        item.song
      );

  });


  /* ============================================================= */
  /* POST METHODS */
  /* ============================================================= */

  toggleLike(postId: number) {

    this.posts.update(current =>

      current.map(post => {

        if (post.id === postId) {

          return {
            ...post,

            liked: !post.liked,

            likes:
              post.liked
                ? post.likes - 1
                : post.likes + 1

          };

        }

        return post;

      })

    );

  }


  createPost() {

    const content =
      this.newPostContent.value?.trim();

    if (!content) {
      return;
    }

    const newEntry: Post = {

      id: Date.now(),

      author: 'Aarav Kulkarni',

      role: 'Sitar Student • Pune',

      avatar: 'AK',

      time: 'Just now',

      content,

      likes: 1,

      commentsCount: 0,

      liked: true,

      comments: []

    };

    this.posts.update(posts => [
      newEntry,
      ...posts
    ]);

    this.newPostContent.setValue('');

  }


  /* ============================================================= */
  /* AUDIO */
  /* ============================================================= */

  private getPracticeAudioContext():
    AudioContext {

    if (!this.practiceAudioContext) {

      this.practiceAudioContext =
        new AudioContext();

    }

    if (
      this.practiceAudioContext.state ===
      'suspended'
    ) {

      void this.practiceAudioContext.resume();

    }

    return this.practiceAudioContext;

  }


  private getSwaraFrequency(
    swara: string
  ): number {

    const baseFrequency =
      261.63;

    const semitones:
      Record<string, number> = {

        S: 0,
        r: 1,
        R: 2,
        g: 3,
        G: 4,
        M: 5,
        m: 6,
        P: 7,
        d: 8,
        D: 9,
        n: 10,
        N: 11

      };

    return baseFrequency *
      Math.pow(
        2,
        (semitones[swara] ?? 0) / 12
      );

  }


  playSwaraNote(
    swara: string
  ) {

    this.activeSwara =
      swara;

    const ctx =
      this.getPracticeAudioContext();

    const oscillator =
      ctx.createOscillator();

    const gain =
      ctx.createGain();

    const now =
      ctx.currentTime;

    oscillator.type =
      'sine';

    oscillator.frequency
      .setValueAtTime(
        this.getSwaraFrequency(swara),
        now
      );

    gain.gain
      .setValueAtTime(
        0.0001,
        now
      );

    gain.gain
      .exponentialRampToValueAtTime(
        0.22,
        now + 0.02
      );

    gain.gain
      .exponentialRampToValueAtTime(
        0.0001,
        now + 0.7
      );

    oscillator.connect(gain);

    gain.connect(
      ctx.destination
    );

    oscillator.start(now);

    oscillator.stop(
      now + 0.75
    );

    window.setTimeout(() => {

      if (
        this.activeSwara === swara
      ) {

        this.activeSwara = '';

      }

    }, 750);

  }


  /* ============================================================= */
  /* TAAL METHODS */
  /* ============================================================= */

  selectPracticeTaal() {

    this.stopTaalPractice();

    this.practiceTaalBeats =
      this.taalStructures[
        this.selectedPracticeTaal
      ] ||
      this.taalStructures['Teental'];

  }


  toggleTaalPractice() {

    if (
      this.isTaalPracticePlaying()
    ) {

      this.stopTaalPractice();

      return;

    }

    this.isTaalPracticePlaying
      .set(true);

    this.activeTaalBeat =
      0;

    this.playTaalBeat(0);

    this.startTaalTimer();

  }


  private startTaalTimer() {

    if (
      this.taalPracticeTimer
    ) {

      clearInterval(
        this.taalPracticeTimer
      );

    }

    const interval =
      (60 /
        Number(this.practiceBpm)) *
      1000;

    this.taalPracticeTimer =
      setInterval(() => {

        if (
          !this.isTaalPracticePlaying()
        ) {
          return;
        }

        const nextBeat =
          (
            this.activeTaalBeat + 1
          ) %
          this.practiceTaalBeats.length;

        this.playTaalBeat(
          nextBeat
        );

      }, interval);

  }


  private stopTaalPractice() {

    if (
      this.taalPracticeTimer
    ) {

      clearInterval(
        this.taalPracticeTimer
      );

      this.taalPracticeTimer =
        null;

    }

    this.isTaalPracticePlaying
      .set(false);

    this.activeTaalBeat =
      -1;

  }


  playTaalBeat(
    index: number
  ) {

    const beat =
      this.practiceTaalBeats[index];

    if (!beat) {
      return;
    }

    this.activeTaalBeat =
      index;

    this.playTablaBol(
      beat.bol
    );

  }


  private playTablaBol(
    bol: string
  ) {

    const ctx =
      this.getPracticeAudioContext();

    const oscillator =
      ctx.createOscillator();

    const gain =
      ctx.createGain();

    const now =
      ctx.currentTime;


    if (
      ['Dha', 'Dhin', 'Dhi']
        .includes(bol)
    ) {

      oscillator.type =
        'sine';

      oscillator.frequency
        .setValueAtTime(
          105,
          now
        );

      oscillator.frequency
        .exponentialRampToValueAtTime(
          48,
          now + 0.25
        );

      gain.gain
        .setValueAtTime(
          0.34,
          now
        );

      gain.gain
        .exponentialRampToValueAtTime(
          0.0001,
          now + 0.32
        );

    } else if (
      ['Tin', 'Ti', 'Ta']
        .includes(bol)
    ) {

      oscillator.type =
        'triangle';

      oscillator.frequency
        .setValueAtTime(
          360,
          now
        );

      oscillator.frequency
        .exponentialRampToValueAtTime(
          210,
          now + 0.12
        );

      gain.gain
        .setValueAtTime(
          0.2,
          now
        );

      gain.gain
        .exponentialRampToValueAtTime(
          0.0001,
          now + 0.16
        );

    } else {

      oscillator.type =
        'sine';

      oscillator.frequency
        .setValueAtTime(
          180,
          now
        );

      gain.gain
        .setValueAtTime(
          0.16,
          now
        );

      gain.gain
        .exponentialRampToValueAtTime(
          0.0001,
          now + 0.14
        );

    }


    oscillator.connect(gain);

    gain.connect(
      ctx.destination
    );

    oscillator.start(now);

    oscillator.stop(
      now + 0.35
    );

  }


  restartTaalTempo() {

    if (
      this.isTaalPracticePlaying()
    ) {

      this.startTaalTimer();

    }

  }


  /* ============================================================= */
  /* TANPURA */
  /* ============================================================= */

  toggleTanpura() {

    this.isTanpuraPlaying.update(
      value => !value
    );

  }


  /* ============================================================= */
  /* PRACTICE LOG */
  /* ============================================================= */

  logPracticeSession() {

    const raga =
      this.practiceRagaCtrl.value
        ?.trim();

    const duration =
      Number(
        this.practiceDurationCtrl.value
      );

    const notes =
      this.practiceNotesCtrl.value
        ?.trim() ||
      'Regular riyaz session.';


    if (
      !raga ||
      !duration ||
      isNaN(duration)
    ) {

      window.alert(
        'Please enter a valid Raga name and practice duration in minutes.'
      );

      return;

    }


    const newLog: PracticeLog = {

      id: Date.now(),

      raga,

      durationMinutes:
        duration,

      notes,

      date: 'Just now'

    };


    this.practiceLogs.update(
      logs => [
        newLog,
        ...logs
      ]
    );


    this.practiceRagaCtrl
      .setValue('');

    this.practiceDurationCtrl
      .setValue('');

    this.practiceNotesCtrl
      .setValue('');


    window.alert(
      'Practice session logged successfully!'
    );

  }


  /* ============================================================= */
  /* QUIZ METHODS */
  /* ============================================================= */

  setAudioQuizMode(mode: 'raag' | 'notation') {
    this.audioQuizMode.set(mode);
    this.selectedAudioQuizAnswer.set('');
    this.audioQuizSubmitted.set(false);
  }

  playAudioQuizClip() {
    const ctx = this.getPracticeAudioContext();
    const phrase = this.currentAudioQuizClip().notes;
    const startAt = ctx.currentTime + 0.08;
    const noteDuration = 0.42;
    phrase.forEach((swara, index) => {
      const oscillator = ctx.createOscillator();
      const gain = ctx.createGain();
      const noteStart = startAt + index * (noteDuration + 0.07);
      const noteEnd = noteStart + noteDuration;
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(this.getSwaraFrequency(swara), noteStart);
      gain.gain.setValueAtTime(0.0001, noteStart);
      gain.gain.linearRampToValueAtTime(0.16, noteStart + 0.035);
      gain.gain.setValueAtTime(0.16, noteEnd - 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, noteEnd);
      oscillator.connect(gain);
      gain.connect(ctx.destination);
      oscillator.start(noteStart);
      oscillator.stop(noteEnd + 0.02);
    });
  }

  chooseAudioQuizAnswer(answer: string) {
    if (!this.audioQuizSubmitted()) this.selectedAudioQuizAnswer.set(answer);
  }

  submitAudioQuizAnswer() {
    if (!this.selectedAudioQuizAnswer() || this.audioQuizSubmitted()) return;
    this.audioQuizSubmitted.set(true);
    if (this.audioQuizWasCorrect()) {
      this.audioQuizCorrectCount.update(count => count + 1);
      this.quizScore.update(score => score + 10);
    }
  }

  nextAudioQuizClip() {
    this.audioQuizIndex.update(index => (index + 1) % this.audioQuizClips.length);
    this.selectedAudioQuizAnswer.set('');
    this.audioQuizSubmitted.set(false);
  }

  resetAudioQuiz() {
    this.audioQuizIndex.set(0);
    this.selectedAudioQuizAnswer.set('');
    this.audioQuizSubmitted.set(false);
    this.audioQuizCorrectCount.set(0);
  }

  chooseQuizAnswer(answer: string) {
    if (!this.quizSubmitted()) {
      this.selectedQuizAnswer.set(answer);
    }
  }

  submitQuizAnswer() {
    if (!this.selectedQuizAnswer() || this.quizSubmitted()) {
      return;
    }

    this.quizSubmitted.set(true);

    if (this.quizWasCorrect()) {
      this.quizScore.update(score => score + 10);
      this.quizCorrectCount.update(count => count + 1);
    }
  }

  nextQuizQuestion() {
    this.quizIndex.update(index => (index + 1) % this.quizQuestions.length);
    this.selectedQuizAnswer.set('');
    this.quizSubmitted.set(false);
  }

  resetQuiz() {
    this.quizIndex.set(0);
    this.selectedQuizAnswer.set('');
    this.quizSubmitted.set(false);
    this.quizCorrectCount.set(0);
  }


  /* ============================================================= */
  /* SONG METHODS */
  /* ============================================================= */

  selectSong(
    song: SongItem
  ) {

    this.selectedSong =
      song;

    window.setTimeout(() => {

      document
        .getElementById('song-detail')
        ?.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });

    }, 50);

  }


  closeSongInfo() {

    this.selectedSong =
      null;

  }


  exploreSimilarSong(
    song: SongItem
  ) {

    this.selectedSong =
      song;

    window.setTimeout(() => {

      document
        .getElementById('song-detail')
        ?.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });

    }, 50);

  }


  playSongSample(
    song: SongItem
  ) {

    /*
     * Currently a demo.
     *
     * Later this can be connected
     * to an actual audio URL.
     */

    window.alert(
      `Playing ${song.title}

Raga: ${song.raga}
Taal: ${song.taal}
Laya: ${song.laya}`
    );

  }


  practiceSelectedSong() {

    if (!this.selectedSong) {
      return;
    }

    const song =
      this.selectedSong;

    this.practiceRagaCtrl
      .setValue(
        song.raga
      );

    this.selectedPracticeTaal =
      song.taal;

    if (
      this.taalStructures[
        song.taal
      ]
    ) {

      this.practiceTaalBeats =
        this.taalStructures[
          song.taal
        ];

    }

    this.activeTab
      .set('sadhana');


    window.setTimeout(() => {

      document
        .getElementById('song-detail')
        ?.scrollIntoView({
          behavior: 'smooth'
        });

    }, 100);

  }


  shareSong(
    song: SongItem
  ) {

    const shareText =
      `${song.title} • ${song.raga} • ${song.taal}`;

    if (
      navigator.clipboard
    ) {

      void navigator.clipboard
        .writeText(shareText)
        .then(() => {

          window.alert(
            'Song information copied to clipboard!'
          );

        })
        .catch(() => {

          window.alert(
            shareText
          );

        });

    } else {

      window.alert(
        shareText
      );

    }

  }


  /* ============================================================= */
  /* OTHER METHODS */
  /* ============================================================= */

  connectArtist(
    name: string
  ) {

    window.alert(
      `Connection request sent to ${name}! They will reach out via Swara-Setu messaging.`
    );

  }


  bookEvent(
    title: string
  ) {

    window.alert(
      `Successfully registered for "${title}"! Check your email for ticket pass details.`
    );

  }


  exploreRaga(
    ragaName: string
  ) {

    window.alert(
      `Opening audio archive and bandish notes for ${ragaName}...`
    );

  }

}

