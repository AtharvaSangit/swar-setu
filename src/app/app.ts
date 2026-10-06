import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';

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

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  template: `
    <div class="min-h-screen bg-[#FDFBF7] text-[#1E293B] font-sans flex flex-col selection:bg-amber-100">
      
      <!-- Top Navigation Header -->
      <header class="bg-white/90 backdrop-blur-md border-b border-stone-200 sticky top-0 z-50">
        <div class="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div class="flex items-center space-x-3 cursor-pointer" (click)="activeTab.set('feed')">
            <div class="w-10 h-10 rounded-full bg-amber-700 text-white flex items-center justify-center font-bold text-lg shadow-sm">
              ॐ
            </div>
            <div>
              <h1 class="text-xl font-bold tracking-tight text-stone-900">SWARA-SETU</h1>
              <p class="text-xs text-amber-800 tracking-wider font-medium">Global Classical Music Ecosystem</p>
            </div>
          </div>

          <!-- Navigation Tabs -->
          <nav class="hidden md:flex space-x-1">
            @for (tab of tabs; track tab.id) {
              <button 
                class="px-4 py-2 rounded-full text-sm font-medium transition-all duration-200"
                [class.bg-amber-50]="activeTab() === tab.id"
                [class.text-amber-900]="activeTab() === tab.id"
                [class.text-stone-600]="activeTab() !== tab.id"
                [class.hover:bg-stone-100]="activeTab() !== tab.id"
                (click)="activeTab.set(tab.id)">
                <i [class]="tab.icon + ' mr-2'"></i>{{ tab.label }}
              </button>
            }
          </nav>

          <div class="flex items-center space-x-4">
            <span class="hidden sm:inline-block text-xs font-semibold px-3 py-1 rounded-full bg-amber-100 text-amber-900">
              Prototype v1.1
            </span>
          </div>
        </div>
      </header>

      <!-- Mobile Sub-navigation -->
      <div class="flex md:hidden bg-white border-b border-stone-200 overflow-x-auto px-4 py-2 space-x-2">
        @for (tab of tabs; track tab.id) {
          <button 
            class="px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap"
            [class.bg-amber-700]="activeTab() === tab.id"
            [class.text-white]="activeTab() === tab.id"
            [class.bg-stone-100]="activeTab() !== tab.id"
            [class.text-stone-700]="activeTab() !== tab.id"
            (click)="activeTab.set(tab.id)">
            {{ tab.label }}
          </button>
        }
      </div>

      <!-- Main Content Container -->
      <main class="flex-grow max-w-7xl w-full mx-auto px-6 py-8">
        
        <!-- FEED TAB -->
        @if (activeTab() === 'feed') {
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            <!-- Left Sidebar: Quick Profile & Stats -->
            <div class="space-y-6">
              <div class="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm">
                <div class="flex items-center space-x-4 mb-4">
                  <div class="w-14 h-14 rounded-full bg-stone-200 flex items-center justify-center text-xl font-bold text-stone-700">
                    AK
                  </div>
                  <div>
                    <h3 class="font-bold text-stone-900">Aarav Kulkarni</h3>
                    <p class="text-xs text-stone-500">Sitar Student • Pune Gharana</p>
                  </div>
                </div>
                <hr class="border-stone-100 my-4">
                <div class="space-y-2 text-sm text-stone-600">
                  <div class="flex justify-between">
                    <span>Following Gurus</span>
                    <span class="font-semibold text-stone-900">12</span>
                  </div>
                  <div class="flex justify-between">
                    <span>Saved Events</span>
                    <span class="font-semibold text-stone-900">4</span>
                  </div>
                  <div class="flex justify-between">
                    <span>Sadhana Logged</span>
                    <span class="font-semibold text-amber-800">{{ practiceLogs().length }} Sessions</span>
                  </div>
                  <div class="flex justify-between">
                    <span>Community Rank</span>
                    <span class="font-semibold text-amber-800">Sadhaka</span>
                  </div>
                </div>
              </div>

              <div class="bg-gradient-to-br from-amber-900 to-stone-900 text-amber-50 rounded-2xl p-6 shadow-sm">
                <h4 class="font-semibold text-amber-200 mb-2">💡 Daily Raga Insight</h4>
                <p class="text-sm italic text-stone-200 leading-relaxed mb-4">
                  "Raga Yaman is performed during the first quarter of the night. It evokes Bhakti and Shanta rasa, known for its calming serenity."
                </p>
                <button 
                  (click)="activeTab.set('discover')"
                  class="text-xs bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 px-3 py-1.5 rounded-lg font-medium transition">
                  Explore Yaman Details &rarr;
                </button>
              </div>
            </div>

            <!-- Center: Social Feed & Posts -->
            <div class="lg:col-span-2 space-y-6">
              
              <!-- Create Post Box -->
              <div class="bg-white rounded-2xl p-5 border border-stone-200 shadow-sm">
                <div class="flex items-center space-x-3 mb-3">
                  <div class="w-10 h-10 rounded-full bg-stone-200 flex items-center justify-center font-bold text-stone-700 text-sm">
                    AK
                  </div>
                  <input 
                    type="text" 
                    [formControl]="newPostContent"
                    placeholder="Share an update, raga thought, or performance announcement..." 
                    class="flex-grow bg-stone-50 border border-stone-200 rounded-full px-4 py-2.5 text-sm focus:outline-none focus:border-amber-700"
                    (keyup.enter)="createPost()">
                </div>
                <div class="flex justify-between items-center pt-2 px-1">
                  <div class="flex space-x-3 text-stone-500 text-xs">
                    <button class="hover:text-amber-800 flex items-center"><i class="fa-solid fa-image mr-1.5"></i> Media</button>
                    <button class="hover:text-amber-800 flex items-center"><i class="fa-solid fa-calendar-days mr-1.5"></i> Event</button>
                    <button class="hover:text-amber-800 flex items-center"><i class="fa-solid fa-music mr-1.5"></i> Audio</button>
                  </div>
                  <button 
                    (click)="createPost()"
                    class="bg-amber-800 hover:bg-amber-900 text-white text-xs font-semibold px-4 py-2 rounded-full transition">
                    Publish
                  </button>
                </div>
              </div>

              <!-- Posts Feed List -->
              @for (post of posts(); track post.id) {
                <div class="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm space-y-4">
                  <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-3">
                      <div class="w-10 h-10 rounded-full bg-amber-100 text-amber-900 font-bold flex items-center justify-center text-sm">
                        {{ post.avatar }}
                      </div>
                      <div>
                        <h4 class="font-bold text-stone-900 text-sm">{{ post.author }}</h4>
                        <p class="text-xs text-stone-500">{{ post.role }} • {{ post.time }}</p>
                      </div>
                    </div>
                    <span class="text-xs text-stone-400"><i class="fa-solid fa-ellipsis"></i></span>
                  </div>

                  <p class="text-stone-800 text-sm leading-relaxed">
                    {{ post.content }}
                  </p>

                  <div class="flex items-center space-x-6 pt-2 border-t border-stone-100 text-stone-600 text-xs">
                    <button 
                      (click)="toggleLike(post.id)"
                      class="flex items-center space-x-1.5 hover:text-amber-800 transition"
                      [class.text-amber-700]="post.liked">
                      <i class="fa-solid fa-heart" [class.fa-solid]="post.liked" [class.fa-regular]="!post.liked"></i>
                      <span>{{ post.likes }} Likes</span>
                    </button>
                    <button class="flex items-center space-x-1.5 hover:text-amber-800 transition">
                      <i class="fa-regular fa-comment"></i>
                      <span>{{ post.comments.length }} Comments</span>
                    </button>
                    <button class="flex items-center space-x-1.5 hover:text-amber-800 transition">
                      <i class="fa-solid fa-share"></i>
                      <span>Share</span>
                    </button>
                  </div>

                  <!-- Comments Section -->
                  @if (post.comments.length > 0) {
                    <div class="bg-stone-50 rounded-xl p-3 space-y-2 mt-3">
                      @for (comment of post.comments; track $index) {
                        <p class="text-xs text-stone-700 bg-white p-2 rounded border border-stone-100">
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

        <!-- SADHANA (PRACTICE ROOM & TANPURA) TAB -->
        @if (activeTab() === 'sadhana') {
          <div class="space-y-6">
            <div>
              <h2 class="text-2xl font-bold text-stone-900">Sadhana Practice Room & Tanpura Drone</h2>
              <p class="text-stone-600 text-sm">Simulate your daily riyaz drone, keep track of practice hours, and log your notes.</p>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              <!-- Tanpura Simulator Widget -->
              <div class="bg-gradient-to-br from-stone-900 to-amber-950 text-amber-50 rounded-2xl p-6 shadow-md flex flex-col justify-between">
                <div>
                  <div class="flex justify-between items-center mb-6">
                    <span class="text-xs bg-amber-500/20 text-amber-200 px-3 py-1 rounded-full font-semibold">Virtual Shruti Box</span>
                    <span class="w-3 h-3 rounded-full" [class.bg-emerald-500]="isTanpuraPlaying()" [class.bg-stone-500]="!isTanpuraPlaying()"></span>
                  </div>

                  <div class="text-center my-8">
                    <div class="text-xs text-amber-300 uppercase tracking-widest font-semibold mb-1">Current Root Note (Paas)</div>
                    <div class="text-5xl font-extrabold text-white tracking-wider mb-2">{{ selectedRootNote }}</div>
                    <div class="text-xs text-stone-300">Combination: {{ selectedTanpuraStyle }}</div>
                  </div>
                </div>

                <div class="space-y-4">
                  <div class="flex justify-center space-x-2">
                    <button 
                      (click)="selectedRootNote = 'C (Sa)'"
                      class="px-3 py-1 rounded text-xs font-medium" [class.bg-amber-700]="selectedRootNote === 'C (Sa)'" [class.bg-stone-800]="selectedRootNote !== 'C (Sa)'">C</button>
                    <button 
                      (click)="selectedRootNote = 'C# (Sa)'"
                      class="px-3 py-1 rounded text-xs font-medium" [class.bg-amber-700]="selectedRootNote === 'C# (Sa)'" [class.bg-stone-800]="selectedRootNote !== 'C# (Sa)'">C#</button>
                    <button 
                      (click)="selectedRootNote = 'D (Sa)'"
                      class="px-3 py-1 rounded text-xs font-medium" [class.bg-amber-700]="selectedRootNote === 'D (Sa)'" [class.bg-stone-800]="selectedRootNote !== 'D (Sa)'">D</button>
                    <button 
                      (click)="selectedRootNote = 'G# (Female Sa)'"
                      class="px-3 py-1 rounded text-xs font-medium" [class.bg-amber-700]="selectedRootNote === 'G# (Female Sa)'" [class.bg-stone-800]="selectedRootNote !== 'G# (Female Sa)'">G# (F)</button>
                  </div>

                  <button 
                    (click)="toggleTanpura()"
                    class="w-full py-3 rounded-xl font-semibold text-sm transition shadow"
                    [class.bg-emerald-700]="isTanpuraPlaying()"
                    [class.hover:bg-emerald-800]="isTanpuraPlaying()"
                    [class.bg-amber-600]="!isTanpuraPlaying()"
                    [class.hover:bg-amber-700]="!isTanpuraPlaying()">
                    <i class="fa-solid" [class.fa-stop]="isTanpuraPlaying()" [class.fa-play]="!isTanpuraPlaying()"></i>
                    {{ isTanpuraPlaying() ? 'Stop Tanpura Drone' : 'Start Tanpura Riyaz' }}
                  </button>
                </div>
              </div>

              <!-- Log Practice Session Form -->
              <div class="lg:col-span-2 bg-white rounded-2xl p-6 border border-stone-200 shadow-sm flex flex-col justify-between">
                <div>
                  <h3 class="font-bold text-stone-900 text-lg mb-4 flex items-center">
                    <i class="fa-solid fa-pen-nib text-amber-800 mr-2"></i> Log Your Riyaz Session
                  </h3>

                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label class="block text-xs font-semibold text-stone-600 mb-1">Raga Practiced</label>
                      <input 
                        type="text" 
                        [formControl]="practiceRagaCtrl"
                        placeholder="e.g., Raga Yaman / Alankars" 
                        class="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-amber-700">
                    </div>
                    <div>
                      <label class="block text-xs font-semibold text-stone-600 mb-1">Duration (Minutes)</label>
                      <input 
                        type="number" 
                        [formControl]="practiceDurationCtrl"
                        placeholder="45" 
                        class="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-amber-700">
                    </div>
                  </div>

                  <div class="mb-4">
                    <label class="block text-xs font-semibold text-stone-600 mb-1">Practice Notes & Focus Areas</label>
                    <textarea 
                      [formControl]="practiceNotesCtrl"
                      rows="2"
                      placeholder="Focus on slow vilambit khayal taans, shuddha Madhyam stability..."
                      class="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-amber-700"></textarea>
                  </div>
                </div>

                <div class="flex justify-end">
                  <button 
                    (click)="logPracticeSession()"
                    class="bg-amber-800 hover:bg-amber-900 text-white text-xs font-semibold px-6 py-2.5 rounded-full transition">
                    Save Practice Log
                  </button>
                </div>
              </div>

            </div>

            <!-- SWARA & TAAL PRACTICE STUDIO: Added feature, styled to match the original UI -->
            <div class="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm">
              <div class="flex flex-col md:flex-row justify-between md:items-center gap-3 mb-5">
                <div>
                  <h3 class="font-bold text-stone-900 text-lg flex items-center">
                    <i class="fa-solid fa-music text-amber-800 mr-2"></i> Swara & Taal Practice Studio
                  </h3>
                  <p class="text-xs text-stone-500 mt-1">
                    Practice individual swaras and keep a live tabla taal cycle alongside your tanpura drone.
                  </p>
                </div>

                <div class="flex items-center gap-2">
                  <label class="text-xs font-semibold text-stone-600">Taal</label>
                  <select
                    [(ngModel)]="selectedPracticeTaal"
                    (change)="selectPracticeTaal()"
                    class="bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-xs text-stone-700 focus:outline-none focus:border-amber-700">
                    @for (taal of availableTaals; track taal) {
                      <option [value]="taal">{{ taal }}</option>
                    }
                  </select>
                </div>
              </div>

              <!-- Swara keyboard -->
              <div class="mb-5">
                <div class="flex justify-between items-center mb-2">
                  <span class="text-xs font-semibold uppercase tracking-wide text-stone-500">Swara Keypad</span>
                  <span class="text-[11px] text-stone-400">Click a key to hear the note</span>
                </div>

                <div class="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-12 gap-1.5">
                  @for (swara of practiceSwaras; track swara.name) {
                    <button
                      type="button"
                      (click)="playSwaraNote(swara.name)"
                      class="h-16 rounded-xl border text-xs font-bold transition-all active:scale-95"
                      [class.bg-amber-800]="activeSwara === swara.name"
                      [class.text-white]="activeSwara === swara.name"
                      [class.border-amber-800]="activeSwara === swara.name"
                      [class.bg-stone-50]="activeSwara !== swara.name"
                      [class.text-stone-800]="activeSwara !== swara.name"
                      [class.border-stone-200]="activeSwara !== swara.name"
                      [class.hover:bg-amber-50]="activeSwara !== swara.name">
                      <span class="block text-base">{{ swara.name }}</span>
                      <span class="block text-[9px] text-stone-400 mt-1" [class.text-amber-100]="activeSwara === swara.name">
                        {{ swara.type }}
                      </span>
                    </button>
                  }
                </div>
              </div>

              <!-- Taal sequencer -->
              <div class="border-t border-stone-100 pt-5">
                <div class="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4">
                  <div class="flex items-center gap-3">
                    <span class="text-xs font-semibold uppercase tracking-wide text-stone-500">
                      {{ selectedPracticeTaal }} Rhythm
                    </span>
                    <span class="text-xs bg-amber-100 text-amber-900 px-2.5 py-1 rounded-full font-semibold">
                      {{ practiceBpm }} BPM
                    </span>
                  </div>

                  <div class="flex items-center gap-3">
                    <label class="text-xs text-stone-500">Tempo</label>
                    <input
                      type="range"
                      min="40"
                      max="180"
                      step="1"
                      [(ngModel)]="practiceBpm"
                      (change)="restartTaalTempo()"
                      class="w-32 accent-amber-700 cursor-pointer">
                    <button
                      type="button"
                      (click)="toggleTaalPractice()"
                      class="px-4 py-2 rounded-full text-xs font-semibold text-white transition"
                      [class.bg-emerald-700]="isTaalPracticePlaying()"
                      [class.hover:bg-emerald-800]="isTaalPracticePlaying()"
                      [class.bg-amber-800]="!isTaalPracticePlaying()"
                      [class.hover:bg-amber-900]="!isTaalPracticePlaying()">
                      <i class="fa-solid mr-1.5" [class.fa-stop]="isTaalPracticePlaying()" [class.fa-play]="!isTaalPracticePlaying()"></i>
                      {{ isTaalPracticePlaying() ? 'Stop Taal' : 'Start Taal' }}
                    </button>
                  </div>
                </div>

                <div class="flex gap-2 overflow-x-auto pb-2">
                  @for (beat of practiceTaalBeats; track beat.matra) {
                    <button
                      type="button"
                      (click)="playTaalBeat(beat.matra - 1)"
                      class="min-w-[64px] h-20 rounded-xl border flex flex-col items-center justify-between p-2 transition-all"
                      [class.bg-amber-800]="activeTaalBeat === beat.matra - 1"
                      [class.text-white]="activeTaalBeat === beat.matra - 1"
                      [class.border-amber-800]="activeTaalBeat === beat.matra - 1"
                      [class.bg-stone-50]="activeTaalBeat !== beat.matra - 1"
                      [class.border-stone-200]="activeTaalBeat !== beat.matra - 1">
                      <span class="text-[10px]" [class.text-amber-100]="activeTaalBeat === beat.matra - 1" [class.text-stone-400]="activeTaalBeat !== beat.matra - 1">
                        {{ beat.matra }}
                      </span>
                      <span class="text-sm font-bold">{{ beat.bol }}</span>
                      <span
                        class="text-[9px] font-semibold px-1.5 py-0.5 rounded"
                        [class.bg-white/20]="activeTaalBeat === beat.matra - 1"
                        [class.bg-amber-100]="activeTaalBeat !== beat.matra - 1"
                        [class.text-amber-100]="activeTaalBeat === beat.matra - 1"
                        [class.text-amber-900]="activeTaalBeat !== beat.matra - 1">
                        {{ beat.type }}
                      </span>
                    </button>
                  }
                </div>
              </div>
            </div>

            <!-- Recent Sadhana Logs -->
            <div class="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm">
              <h3 class="font-bold text-stone-900 text-base mb-4">Your Recent Sadhana History</h3>
              
              <div class="space-y-3">
                @for (log of practiceLogs(); track log.id) {
                  <div class="flex flex-col md:flex-row justify-between items-start md:items-center p-4 bg-stone-50 rounded-xl border border-stone-100 gap-2">
                    <div>
                      <div class="flex items-center space-x-2">
                        <span class="font-bold text-stone-900 text-sm">{{ log.raga }}</span>
                        <span class="text-xs bg-amber-100 text-amber-900 px-2.5 py-0.5 rounded-full font-semibold">{{ log.durationMinutes }} mins</span>
                      </div>
                      <p class="text-xs text-stone-600 mt-1">{{ log.notes }}</p>
                    </div>
                    <span class="text-xs text-stone-400 font-medium">{{ log.date }}</span>
                  </div>
                }
              </div>
            </div>

          </div>
        }

        <!-- ARTIST & TEACHER PROFILES TAB -->
        @if (activeTab() === 'artists') {
          <div class="space-y-6">
            <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h2 class="text-2xl font-bold text-stone-900">Gurus, Teachers & Artists Directory</h2>
                <p class="text-stone-600 text-sm">Discover masters, vocalists, instrumentalists, and registered institutions.</p>
              </div>
              <div class="flex space-x-2 w-full md:w-auto">
                <input 
                  type="text" 
                  [formControl]="artistSearch"
                  placeholder="Search artist or instrument..." 
                  class="bg-white border border-stone-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-amber-700 w-full md:w-64">
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              @for (artist of filteredArtists(); track artist.id) {
                <div class="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm flex flex-col justify-between hover:border-amber-300 transition">
                  <div>
                    <div class="flex items-start justify-between mb-4">
                      <div class="w-16 h-16 rounded-2xl bg-amber-100 text-amber-900 font-bold flex items-center justify-center text-xl shadow-inner">
                        {{ artist.image }}
                      </div>
                      <span class="text-xs bg-stone-100 text-stone-700 px-2.5 py-1 rounded-full font-medium">
                        ★ {{ artist.rating }}
                      </span>
                    </div>

                    <h3 class="font-bold text-stone-900 text-lg mb-0.5">{{ artist.name }}</h3>
                    <p class="text-xs text-amber-800 font-semibold mb-2">{{ artist.discipline }}</p>
                    <p class="text-xs text-stone-500 mb-3"><i class="fa-solid fa-location-dot mr-1"></i> {{ artist.location }} • {{ artist.gharana }}</p>
                    
                    <p class="text-sm text-stone-600 leading-relaxed mb-4">
                      {{ artist.bio }}
                    </p>
                  </div>

                  <div class="pt-4 border-t border-stone-100 flex justify-between items-center">
                    <span class="text-xs text-stone-500 font-medium">Verified Guru</span>
                    <button 
                      (click)="connectArtist(artist.name)"
                      class="bg-stone-900 hover:bg-amber-800 text-white text-xs font-semibold px-4 py-2 rounded-full transition">
                      Connect / Enquire
                    </button>
                  </div>
                </div>
              }
            </div>
          </div>
        }

        <!-- EVENTS & PROGRAMS TAB -->
        @if (activeTab() === 'events') {
          <div class="space-y-6">
            <div>
              <h2 class="text-2xl font-bold text-stone-900">Global Concerts, Festivals & Masterclasses</h2>
              <p class="text-stone-600 text-sm">Explore upcoming Indian classical music programs worldwide.</p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              @for (event of eventsList; track event.id) {
                <div class="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm flex flex-col justify-between">
                  <div>
                    <div class="flex justify-between items-start mb-3">
                      <span class="text-xs bg-amber-100 text-amber-900 font-semibold px-3 py-1 rounded-full">
                        {{ event.type }}
                      </span>
                      <span class="text-xs font-bold text-stone-600">{{ event.price }}</span>
                    </div>

                    <h3 class="font-bold text-stone-900 text-xl mb-1">{{ event.title }}</h3>
                    <p class="text-xs text-stone-500 mb-4 font-medium">Featuring: {{ event.artist }}</p>

                    <div class="space-y-1.5 text-xs text-stone-600 mb-4">
                      <p><i class="fa-solid fa-calendar mr-2 text-amber-800"></i>{{ event.date }}</p>
                      <p><i class="fa-solid fa-location-dot mr-2 text-amber-800"></i>{{ event.location }}</p>
                    </div>
                  </div>

                  <div class="pt-4 border-t border-stone-100 flex justify-between items-center">
                    <span class="text-xs text-stone-500">Global Online Stream Available</span>
                    <button 
                      (click)="bookEvent(event.title)"
                      class="bg-amber-800 hover:bg-amber-900 text-white text-xs font-semibold px-4 py-2 rounded-full transition">
                      Book Ticket / RSVP
                    </button>
                  </div>
                </div>
              }
            </div>
          </div>
        }

        <!-- DISCOVER RAGAS TAB -->
        @if (activeTab() === 'discover') {
          <div class="space-y-6">
            <div>
              <h2 class="text-2xl font-bold text-stone-900">Discover Ragas, Talas & Traditions</h2>
              <p class="text-stone-600 text-sm">Explore classical music theory, gharana roots, and traditional compositions.</p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              @for (raga of ragas; track raga.name) {
                <div class="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm flex flex-col justify-between">
                  <div>
                    <div class="flex justify-between items-center mb-3">
                      <h3 class="font-bold text-stone-900 text-lg">{{ raga.name }}</h3>
                      <span class="text-xs bg-stone-100 text-stone-700 px-2.5 py-1 rounded-full">{{ raga.thaat }} Thaat</span>
                    </div>

                    <p class="text-xs text-amber-800 font-medium mb-3">Time: {{ raga.time }} • Mood: {{ raga.mood }}</p>
                    
                    <p class="text-sm text-stone-600 leading-relaxed mb-4">
                      {{ raga.description }}
                    </p>
                  </div>

                  <button 
                    (click)="exploreRaga(raga.name)"
                    class="w-full bg-stone-100 hover:bg-amber-50 text-stone-800 hover:text-amber-900 text-xs font-semibold py-2.5 rounded-xl transition">
                    Listen to Sample & Bandish &rarr;
                  </button>
                </div>
              }
            </div>
          </div>
        }

      </main>

      <!-- Footer -->
      <footer class="bg-white border-t border-stone-200 mt-16 py-8 text-center text-xs text-stone-500">
        <p class="font-medium text-stone-800 mb-1">Swara-Setu • A Digital Home for Indian Classical Music</p>
        <p>© 2026 Global Platform Initiative. Connecting Tradition with the Digital Generation.</p>
      </footer>

    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class App {
  activeTab = signal<'feed' | 'sadhana' | 'artists' | 'events' | 'discover'>('feed');

  tabs = [
    { id: 'feed', label: 'Community Feed', icon: 'fa-solid fa-globe' },
    { id: 'sadhana', label: 'Sadhana & Tanpura', icon: 'fa-solid fa-headphones-simple' },
    { id: 'artists', label: 'Gurus & Artists', icon: 'fa-solid fa-users' },
    { id: 'events', label: 'Events & Concerts', icon: 'fa-solid fa-calendar-days' },
    { id: 'discover', label: 'Discover Ragas', icon: 'fa-solid fa-compass' }
  ] as const;

  newPostContent = new FormControl('');
  artistSearch = new FormControl('');

  // Sadhana & Practice Tracker Controls
  practiceRagaCtrl = new FormControl('');
  practiceDurationCtrl = new FormControl('');
  practiceNotesCtrl = new FormControl('');
  
  isTanpuraPlaying = signal(false);
  selectedRootNote = 'C (Sa)';
  selectedTanpuraStyle = 'Traditional Pancham (Pa)';

  // Swara & Taal Practice Studio
  selectedPracticeTaal = 'Teental';
  practiceBpm = 100;
  activeSwara = '';
  activeTaalBeat = -1;
  isTaalPracticePlaying = signal(false);
  private taalPracticeTimer: ReturnType<typeof setInterval> | null = null;
  private practiceAudioContext: AudioContext | null = null;

  availableTaals = ['Teental', 'Keherwa', 'Dadra', 'Rupak'];

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

  practiceTaalBeats = this.taalStructures[this.selectedPracticeTaal];

  practiceLogs = signal<PracticeLog[]>([
    {
      id: 1,
      raga: 'Raga Yaman',
      durationMinutes: 45,
      notes: 'Worked on vilambit khayal steady laya and meend across Gandhaar.',
      date: 'Yesterday, 6:00 PM'
    },
    {
      id: 2,
      raga: 'Alankars & Shrutis',
      durationMinutes: 30,
      notes: 'Palta practice in three speeds (Drut Laya).',
      date: 'Oct 4, 2026'
    }
  ]);

  posts = signal<Post[]>([
    {
      id: 1,
      author: 'Pandit Rameshwar Mishra',
      role: 'Senior Sitar Guru • Maihar Gharana',
      avatar: 'PM',
      time: '2 hours ago',
      content: 'My upcoming Sitar recital featuring Raga Puriya Dhanashree will be broadcast live this Sunday from Triveni Kala Kendra. All classical music lovers are cordially invited.',
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
      content: 'Completed 3 years of rigorous Khayal practice today under my guru ji! Grateful for this digital platform connecting me with fellow seekers across the globe.',
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
      content: 'Admissions are now officially open for our online Dhrupad masterclass series led by senior exponents. Limited seats available for overseas learners.',
      likes: 65,
      commentsCount: 4,
      liked: false,
      comments: [
        'How can students from the US enroll?'
      ]
    }
  ]);

  artists: Artist[] = [
    {
      id: 1,
      name: 'Pandit Rameshwar Mishra',
      discipline: 'Sitar & Instrumental',
      gharana: 'Maihar Gharana',
      location: 'Varanasi, India',
      bio: 'Exponent of the Senia Maihar tradition with over 35 years of global concert experience and teaching.',
      image: 'PM',
      rating: 4.9
    },
    {
      id: 2,
      name: 'Vidushi Dr. Sunita Kulkarni',
      discipline: 'Hindustani Classical Vocal',
      gharana: 'Kirana Gharana',
      location: 'Pune, India',
      bio: 'Renowned khayal vocalist and professor of musicology, specializing in vilambit khayal and taan techniques.',
      image: 'SK',
      rating: 4.8
    },
    {
      id: 3,
      name: 'Pt. Ravi Shankar Iyer',
      discipline: 'Carnatic Veena & Flute',
      gharana: 'Carnatic Tradition',
      location: 'Chennai, India',
      bio: 'Master instrumentalist blending traditional Carnatic intricacies with global musical collaborations.',
      image: 'RI',
      rating: 4.9
    },
    {
      id: 4,
      name: 'Sitar Academy Europe',
      discipline: 'Music Institution',
      gharana: 'Global Outreach',
      location: 'Berlin, Germany',
      bio: 'Dedicated cultural academy promoting Indian classical music education, workshops, and student recitals in Europe.',
      image: 'AE',
      rating: 4.7
    },
    {
      id: 5,
      name: 'Ustad Tariq Khan',
      discipline: 'Tabla & Percussion',
      gharana: 'Delhi Gharana',
      location: 'Lucknow, India',
      bio: 'Accomplished tabla maestro known for exquisite accompaniment and solo improvisations.',
      image: 'UT',
      rating: 4.9
    },
    {
      id: 6,
      name: 'Meera Nambiar',
      discipline: 'Bharatanatyam & Classical Arts',
      gharana: 'Thanjavur Bani',
      location: 'New York, USA',
      bio: 'Performing artist and educator bridging classical rhythm and dance aesthetics across international stages.',
      image: 'MN',
      rating: 4.6
    }
  ];

  filteredArtists = computed(() => {
    const query = (this.artistSearch.value || '').toLowerCase();
    if (!query) return this.artists;
    return this.artists.filter(a => 
      a.name.toLowerCase().includes(query) || 
      a.discipline.toLowerCase().includes(query) ||
      a.gharana.toLowerCase().includes(query)
    );
  });

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

  ragas: RagaItem[] = [
    {
      name: 'Raga Yaman',
      time: 'First Quarter of Night',
      thaat: 'Kalyan',
      mood: 'Bhakti, Peace, Romance',
      description: 'One of the most fundamental and auspicious evening ragas. Features Tivra Ma and all other natural notes.'
    },
    {
      name: 'Raga Bhairav',
      time: 'Early Morning (Dawn)',
      thaat: 'Bhairav',
      mood: 'Devotion, Seriousness, Awakening',
      description: 'A majestic morning raga utilizing Komal Re and Komal Dha, invoking deep meditative calm.'
    },
    {
      name: 'Raga Darbari Kanada',
      time: 'Midnight',
      thaat: 'Asavari',
      mood: 'Majestic, Profound, Melancholic',
      description: 'Created by Tansen in the court of Emperor Akbar. Known for its slow, grave movements and gamak oscillations.'
    }
  ];

  toggleLike(postId: number) {
    this.posts.update(current => 
      current.map(p => {
        if (p.id === postId) {
          return {
            ...p,
            liked: !p.liked,
            likes: p.liked ? p.likes - 1 : p.likes + 1
          };
        }
        return p;
      })
    );
  }

  createPost() {
    const content = this.newPostContent.value?.trim();
    if (!content) return;

    const newEntry: Post = {
      id: Date.now(),
      author: 'Aarav Kulkarni',
      role: 'Sitar Student • Pune',
      avatar: 'AK',
      time: 'Just now',
      content: content,
      likes: 1,
      commentsCount: 0,
      liked: true,
      comments: []
    };

    this.posts.update(posts => [newEntry, ...posts]);
    this.newPostContent.setValue('');
  }

  private getPracticeAudioContext(): AudioContext {
    if (!this.practiceAudioContext) {
      this.practiceAudioContext = new AudioContext();
    }
    if (this.practiceAudioContext.state === 'suspended') {
      void this.practiceAudioContext.resume();
    }
    return this.practiceAudioContext;
  }

  private getSwaraFrequency(swara: string): number {
    const baseFrequency = 261.63; // C / Sa reference
    const semitones: Record<string, number> = {
      S: 0, r: 1, R: 2, g: 3, G: 4, M: 5,
      m: 6, P: 7, d: 8, D: 9, n: 10, N: 11
    };
    return baseFrequency * Math.pow(2, (semitones[swara] ?? 0) / 12);
  }

  playSwaraNote(swara: string) {
    this.activeSwara = swara;

    const ctx = this.getPracticeAudioContext();
    const oscillator = ctx.createOscillator();
    const gain = ctx.createGain();
    const now = ctx.currentTime;

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(this.getSwaraFrequency(swara), now);

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.22, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.7);

    oscillator.connect(gain);
    gain.connect(ctx.destination);
    oscillator.start(now);
    oscillator.stop(now + 0.75);

    window.setTimeout(() => {
      if (this.activeSwara === swara) this.activeSwara = '';
    }, 750);
  }

  selectPracticeTaal() {
    this.stopTaalPractice();
    this.practiceTaalBeats = this.taalStructures[this.selectedPracticeTaal] || this.taalStructures['Teental'];
  }

  toggleTaalPractice() {
    if (this.isTaalPracticePlaying()) {
      this.stopTaalPractice();
      return;
    }

    this.isTaalPracticePlaying.set(true);
    this.activeTaalBeat = 0;
    this.playTaalBeat(0);
    this.startTaalTimer();
  }

  private startTaalTimer() {
    if (this.taalPracticeTimer) clearInterval(this.taalPracticeTimer);

    const interval = (60 / Number(this.practiceBpm)) * 1000;
    this.taalPracticeTimer = setInterval(() => {
      if (!this.isTaalPracticePlaying()) return;

      const nextBeat = (this.activeTaalBeat + 1) % this.practiceTaalBeats.length;
      this.playTaalBeat(nextBeat);
    }, interval);
  }

  private stopTaalPractice() {
    if (this.taalPracticeTimer) {
      clearInterval(this.taalPracticeTimer);
      this.taalPracticeTimer = null;
    }
    this.isTaalPracticePlaying.set(false);
    this.activeTaalBeat = -1;
  }

  playTaalBeat(index: number) {
    const beat = this.practiceTaalBeats[index];
    if (!beat) return;

    this.activeTaalBeat = index;
    this.playTablaBol(beat.bol);
  }

  private playTablaBol(bol: string) {
    const ctx = this.getPracticeAudioContext();
    const oscillator = ctx.createOscillator();
    const gain = ctx.createGain();
    const now = ctx.currentTime;

    if (['Dha', 'Dhin', 'Dhi'].includes(bol)) {
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(105, now);
      oscillator.frequency.exponentialRampToValueAtTime(48, now + 0.25);
      gain.gain.setValueAtTime(0.34, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.32);
    } else if (['Tin', 'Ti', 'Ta'].includes(bol)) {
      oscillator.type = 'triangle';
      oscillator.frequency.setValueAtTime(360, now);
      oscillator.frequency.exponentialRampToValueAtTime(210, now + 0.12);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.16);
    } else {
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(180, now);
      gain.gain.setValueAtTime(0.16, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.14);
    }

    oscillator.connect(gain);
    gain.connect(ctx.destination);
    oscillator.start(now);
    oscillator.stop(now + 0.35);
  }

  restartTaalTempo() {
    if (this.isTaalPracticePlaying()) this.startTaalTimer();
  }

  toggleTanpura() {
    this.isTanpuraPlaying.update(val => !val);
  }

  logPracticeSession() {
    const raga = this.practiceRagaCtrl.value?.trim();
    const duration = Number(this.practiceDurationCtrl.value);
    const notes = this.practiceNotesCtrl.value?.trim() || 'Regular riyaz session.';

    if (!raga || !duration || isNaN(duration)) {
      window.alert('Please enter a valid Raga name and practice duration in minutes.');
      return;
    }

    const newLog: PracticeLog = {
      id: Date.now(),
      raga,
      durationMinutes: duration,
      notes,
      date: 'Just now'
    };

    this.practiceLogs.update(logs => [newLog, ...logs]);
    this.practiceRagaCtrl.setValue('');
    this.practiceDurationCtrl.setValue('');
    this.practiceNotesCtrl.setValue('');
    window.alert('Practice session logged successfully to your profile!');
  }

  connectArtist(name: string) {
    window.alert(`Connection request sent to ${name}! They will reach out via Swara-Setu messaging.`);
  }

  bookEvent(title: string) {
    window.alert(`Successfully registered for "${title}"! Check your email for ticket pass details.`);
  }

  exploreRaga(ragaName: string) {
    window.alert(`Opening audio archive and bandish notes for ${ragaName}...`);
  }
}