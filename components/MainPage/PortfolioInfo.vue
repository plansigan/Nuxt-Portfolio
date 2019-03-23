<template>
    <div>
            <v-container fluid grid-list-lg>
                <v-layout row wrap>
                    <v-flex xs12>
                        <v-hover>
                            <v-card slot-scope="{ hover }"
                                :class="`elevation-${hover ? 12 : 2}`"
                                class="mx-auto white--text"
                                color="#969696">
                                <v-card-title primary-title>
                                <div>
                                    <div class="headline">
                                        Who am I?
                                    </div>
                                    <span>
                                        I'm Paolo Luis G. Lansigan, a full stack Web Developer based in the Philippines,Manila
                                    </span>
                                </div>
                                </v-card-title>
                                <v-card-actions>
                                    <v-btn @click="PortfolioDetails('WhoAmI')" flat dark>Read more >></v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-hover>
                    </v-flex>
                    <v-flex xs12>
                        <v-hover>
                            <v-card slot-scope="{ hover }"
                                    :class="`elevation-${hover ? 12 : 2}`"
                                    class="mx-auto white--text"
                                    color="cyan darken-2">
                                <v-card-title primary-title>
                                    <div>
                                        <div class="headline">
                                            What I do
                                        </div>
                                        <span>
                                            Things that I do with my skills
                                        </span>
                                    </div>
                                </v-card-title>
                                <v-card-actions>
                                    <v-btn @click="PortfolioDetails('WhatIDo')" flat dark>Read more >></v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-hover>
                    </v-flex>
                    <v-flex xs12>
                        <v-hover>
                            <v-card slot-scope="{ hover }"
                                    :class="`elevation-${hover ? 12 : 2}`"
                                    class="mx-auto white--text" 
                                    color="#00564d">
                                <v-card-title primary-title>
                                    <div>
                                        <div class="headline">
                                            My Projects
                                        </div>
                                        <span>
                                            Projects created or involved through the years.
                                        </span>
                                    </div>
                                </v-card-title>
                                <v-card-actions>
                                    <v-btn @click="PortfolioDetails('MyProjects')" flat dark>Read more >></v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-hover>
                    </v-flex>
                </v-layout>
            </v-container>
            <!-- I have over 4 years of experience in the software industry,
                building solutions for a range of both large and small
                companies, learning as much as possible along the way and
                gaining experience in a wide range of exciting technologies. -->

    </div>
</template>

<script>
    export default {
        methods:{
            PortfolioDetails(details){
                this.$root.$emit('show-details',details)
            }
        }   
    }
</script>

