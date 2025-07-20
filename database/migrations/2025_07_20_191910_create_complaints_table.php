<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('complaints', function (Blueprint $table) {
            $table->id();
            $table->string('complaint_id')->unique(); // CMP-001 format
            $table->string('title');
            $table->text('description');
            $table->unsignedBigInteger('user_id'); // Who submitted the complaint
            $table->unsignedBigInteger('assigned_agent_id')->nullable(); // Who is handling it
            $table->enum('status', ['Open', 'In Progress', 'Escalated', 'Resolved', 'Closed'])->default('Open');
            $table->enum('priority', ['Low', 'Medium', 'High', 'Urgent'])->default('Medium');
            $table->enum('type', ['Technical', 'Billing', 'Service', 'Account', 'Other'])->default('Other');
            $table->string('branch')->nullable();
            $table->text('resolution_message')->nullable();
            $table->timestamp('resolved_at')->nullable();
            $table->boolean('requires_manager_approval')->default(false);
            $table->boolean('manager_approved')->nullable();
            $table->unsignedBigInteger('approved_by_manager_id')->nullable();
            $table->timestamp('manager_approved_at')->nullable();
            $table->timestamps();
            
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('assigned_agent_id')->references('id')->on('users')->onDelete('set null');
            $table->foreign('approved_by_manager_id')->references('id')->on('users')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('complaints');
    }
};
