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
        Schema::table('complaints', function (Blueprint $table) {
            if (!Schema::hasColumn('complaints', 'approval_category')) {
                $table->string('approval_category')->nullable()->after('approval_request_title');
            }
            if (!Schema::hasColumn('complaints', 'approval_priority')) {
                $table->string('approval_priority')->nullable()->after('approval_category');
            }
            if (!Schema::hasColumn('complaints', 'estimated_resolution')) {
                $table->string('estimated_resolution')->nullable()->after('approval_priority');
            }
            if (!Schema::hasColumn('complaints', 'additional_notes')) {
                $table->text('additional_notes')->nullable()->after('estimated_resolution');
            }
            if (!Schema::hasColumn('complaints', 'attachments')) {
                $table->text('attachments')->nullable()->after('additional_notes');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('complaints', function (Blueprint $table) {
            $table->dropColumn(['approval_category', 'approval_priority', 'estimated_resolution', 'additional_notes', 'attachments']);
        });
    }
};
